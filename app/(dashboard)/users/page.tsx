import { Suspense } from "react"
import { UsersTable } from "@/components/admin/users-table"
import { UserTableSkeleton } from "@/components/admin/users-table-skeleton"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
      </div>

      <Suspense fallback={<UserTableSkeleton />}>
        <UsersTable />
      </Suspense>
    </div>
  )
}
