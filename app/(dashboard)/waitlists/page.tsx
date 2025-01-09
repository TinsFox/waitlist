import { Suspense } from "react"
import { WaitlistsTable } from "@/components/admin/waitlists-table"
import { WaitlistsTableSkeleton } from "@/components/admin/waitlists-table-skeleton"
import { WaitlistsHeader } from "@/components/admin/waitlists-header"

export default function WaitlistsPage() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <WaitlistsHeader />
      <Suspense fallback={<WaitlistsTableSkeleton />}>
        <WaitlistsTable />
      </Suspense>
    </div>
  )
}
