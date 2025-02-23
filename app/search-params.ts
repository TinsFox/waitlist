import {
  createSearchParamsCache,
  createSerializer,
  parseAsString,
} from "nuqs/server";

export const searchParamsParsers = {
  q: parseAsString.withDefault(""),
  category: parseAsString.withDefault("all"),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);

export const serialize = createSerializer(searchParamsParsers);
