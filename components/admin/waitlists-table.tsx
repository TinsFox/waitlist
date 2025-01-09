"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useWaitlists } from "@/hooks/use-waitlists"
import { WaitlistActions } from "./waitlist-actions"
import { PaginationControls } from "./pagination-controls"
import { WaitlistsTableSkeleton } from "./waitlists-table-skeleton"
import { useQueryState } from "nuqs"
import { searchParamsSchema } from "@/lib/search-params-schema"

export function WaitlistsTable() {
  const { data, isLoading, total } = useWaitlists()
  const [page, setPage] = useQueryState("page", searchParamsSchema.page)
  if (isLoading) {
    return <WaitlistsTableSkeleton />
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((waitlist) => (
            <TableRow key={waitlist.id}>
              <TableCell>{waitlist.email}</TableCell>
              <TableCell>{waitlist.name}</TableCell>
              <TableCell>{waitlist.company}</TableCell>
              <TableCell>{waitlist.emailStatus}</TableCell>
              <TableCell>
                {new Date(waitlist.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <WaitlistActions waitlist={waitlist} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4 border-t">
        <PaginationControls
          page={page}
          onPageChange={setPage}
          totalPages={total}
        />
      </div>
    </div>
  )
}
