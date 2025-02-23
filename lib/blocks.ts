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

