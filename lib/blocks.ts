export async function getAllTemplates() {
  const { Index } = await import(`@/registry/index`)
  return Index
}
