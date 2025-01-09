"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { useQueryState } from "nuqs"
import { searchParamsSchema } from "@/lib/search-params-schema"
import { SortDirection, useUsers } from "@/hooks/use-users"
import { UserActions } from "./user-actions"
import { PaginationControls } from "./pagination-controls"
import type { UserWithRole } from "@/lib/types"

export function UsersTable() {
  const [searchTerm, setSearchTerm] = useQueryState(
    "search",
    searchParamsSchema.search
  )
  const [page, setPage] = useQueryState("page", searchParamsSchema.page)
  const [sortBy] = useQueryState("sortBy", searchParamsSchema.sortBy)
  const [sortDirection] = useQueryState(
    "sortDirection",
    searchParamsSchema.sortDirection
  )

  const { data, error } = useUsers({
    page,
    searchTerm,
    sortBy,
    sortDirection: sortDirection as SortDirection,
  })

  if (error) {
    return <div>Error loading users</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search users..."
          value={searchTerm || ""}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data?.data?.users || []).map((user: UserWithRole) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.banned ? (
                    <span className="text-red-500">Banned</span>
                  ) : (
                    <span className="text-green-500">Active</span>
                  )}
                </TableCell>
                <TableCell>
                  <UserActions user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        currentPage={page || 1}
        onPageChange={setPage}
        totalPages={10}
      />
    </div>
  )
}
