import { createSearchParamsCache, parseAsString } from "nuqs/server"

export const searchParamsParsers = {
  q: parseAsString.withDefault(""),
  category: parseAsString.withDefault("all"),
}

export const searchParamsCache = createSearchParamsCache(searchParamsParsers)
