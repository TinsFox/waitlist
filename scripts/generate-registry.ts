import * as fs from 'fs'
import * as path from 'path'

interface RegistryItem {
  name: string
  title: string
  slug: string
  description: string
  category: string
  component: string
}

interface Registry {
  [key: string]: RegistryItem
}

interface GroupedRegistry {
  [category: string]: Registry
}

function generateRegistry() {
  const registry: GroupedRegistry = {}
  const registryPath = path.join(process.cwd(), 'registry')
  const indexPath = path.join(registryPath, 'index.tsx')

  // Scan for main categories
  const mainCategories = fs.readdirSync(registryPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  console.log('mainCategories: ', mainCategories)

  mainCategories.forEach(mainCategory => {
    registry[mainCategory] = {} // Initialize category group
    const mainCategoryPath = path.join(registryPath, mainCategory)

    // Check if the category has subcategories
    const hasSubCategories = fs.readdirSync(mainCategoryPath, { withFileTypes: true })
      .some(dirent => dirent.isDirectory())

    if (hasSubCategories) {
      // Process subcategories
      const subCategories = fs.readdirSync(mainCategoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

      subCategories.forEach(subCategory => {
        const categoryPath = path.join(mainCategoryPath, subCategory)
        const description = `${toTitleCase(subCategory.replace(/-/g, ' '))} ${mainCategory} template`

        processDirectory(
          categoryPath,
          mainCategory,
          `${mainCategory}/${subCategory}`,
          description,
          registry[mainCategory]
        )
      })
    } else {
      // Process category directly
      const description = 'The future of software development is here'
      processDirectory(
        mainCategoryPath,
        mainCategory,
        mainCategory,
        description,
        registry[mainCategory]
      )
    }
  })

  // Generate index.tsx content
  const indexContent = `import * as React from "react"

interface RegistryItem {
  name: string
  title: string
  slug: string
  description: string
  category: string
  component: React.LazyExoticComponent<React.ComponentType>
}

export const registryData: Record<string, Record<string, RegistryItem>> = ${JSON.stringify(registry, null, 2)
      .replace(/"component": "(.*?)"/g, (_, p1) => `"component": ${p1}`)
      .replace(/\\/g, '')}
`

  // Force overwrite the index.tsx file
  try {
    // Delete the existing file if it exists
    if (fs.existsSync(indexPath)) {
      fs.unlinkSync(indexPath)
    }

    // Write new content
    fs.writeFileSync(indexPath, indexContent, { flag: 'w' })
    console.log('Registry index.tsx generated successfully!')
  } catch (error) {
    console.error('Error writing index.tsx:', error)
    process.exit(1)
  }
}

function processDirectory(
  dirPath: string,
  category: string,
  importPath: string,
  description: string,
  registry: Registry
) {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath)
    files.forEach(file => {
      if (file.endsWith('.tsx')) {
        const name = path.basename(file, '.tsx')
        registry[name] = {
          name,
          title: toTitleCase(name.replace(/-/g, ' ')),
          slug: name,
          description,
          category,
          component: `React.lazy(() => import('./${importPath}/${name}'))`
        }
      }
    })
  }
}

function toTitleCase(str: string): string {
  return str
    .split(' ')
    .map(word => {
      if (word.toLowerCase() === 'in') return 'In'
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}

generateRegistry()