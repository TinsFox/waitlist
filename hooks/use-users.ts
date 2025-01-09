import { useQuery } from "@tanstack/react-query"
import { authClient } from "@/lib/auth-client"

export type SortDirection = "asc" | "desc" | undefined

interface UseUsersParams {
  page?: number
  searchTerm?: string
  sortBy?: string
  sortDirection?: SortDirection
}

export function useUsers({
  page = 1,
  searchTerm,
  sortBy = "createdAt",
  sortDirection = "desc",
}: UseUsersParams) {
  return useQuery({
    queryKey: ["users", page, searchTerm, sortBy, sortDirection],
    queryFn: async () => {
      return authClient.admin.listUsers({
        query: {
          limit: 10,
          offset: (page - 1) * 10,
          ...(searchTerm && {
            searchField: "email",
            searchOperator: "contains",
            searchValue: searchTerm,
          }),
          sortBy,
          sortDirection,
        },
      })
    },
  })
}
