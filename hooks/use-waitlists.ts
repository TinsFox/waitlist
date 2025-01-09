import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import type { Waitlist } from "@/lib/db/schema"

interface WaitlistsResponse {
  items: Waitlist[]
  total: number
}

export function useWaitlists() {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") || "1"
  const perPage = searchParams.get("per_page") || "10"
  const search = searchParams.get("search") || ""

  const { data, error, isLoading } = useQuery<WaitlistsResponse>({
    queryKey: ["waitlists", page, perPage, search],
    queryFn: async () => {
      const response = await fetch(
        `/api/waitlists?page=${page}&per_page=${perPage}&search=${search}`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch waitlists")
      }
      return response.json()
    },
  })

  return { data, error, isLoading, total: data?.total || 0 }
}
