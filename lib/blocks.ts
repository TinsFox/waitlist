export async function getAllRegistryTemplates() {
  const { registryData } = await import(`@/registry/index`)
  return registryData
}

export async function getAllMailBlocks() {
  const { registryData } = await import(`@/registry/index`)
  return registryData.emails
}

export async function getAllHomeBlocks() {
  const { registryData } = await import(`@/registry/index`)
  return registryData.home
}

export async function getAllMailCategories(): Promise<string[]> {
  const { registryData } = await import(`@/registry/index`)
  const categories = new Set<string>()

  Object.values(registryData.emails).forEach((email) => {
    categories.add(email.category)
  })

  return Array.from(categories)
}

