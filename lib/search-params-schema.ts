import { parseAsInteger, parseAsString } from "nuqs/server"

export const searchParamsSchema = {
  page: parseAsInteger.withDefault(1),
  search: parseAsString.withDefault(""),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsString.withDefault("desc"),
}
