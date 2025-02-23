/**
 * 通用搜索函数
 * @param item 要搜索的对象
 * @param searchQuery 搜索关键词
 * @param fields 需要搜索的字段数组，如果为空则搜索对象的所有字符串字段
 * @returns boolean
 */
export function searchInObject<T extends Record<string, any>>(
  item: T,
  searchQuery: string,
  fields?: (keyof T)[]
): boolean {
  if (!searchQuery) return true;

  const normalizedQuery = searchQuery.toLowerCase();
  const searchableFields = fields || Object.keys(item);

  return searchableFields.some(field => {
    const value = item[field];
    return typeof value === 'string' &&
      value.toLowerCase().includes(normalizedQuery);
  });
}