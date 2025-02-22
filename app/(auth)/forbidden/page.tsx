import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1B1B1D] text-white">
      <div className="text-center max-w-[480px] px-4">
        <h1 className="text-7xl font-bold mb-3">403</h1>
        <h2 className="text-2xl font-medium mb-6 text-white/90">
          Access Forbidden
        </h2>
        <p className="text-base text-white/60 mb-8">
          You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <Button
          asChild
          className="bg-[#5E6AD2] hover:bg-[#6E7AE6] text-white rounded-lg px-6 py-2.5 font-medium transition-colors"
        >
          <Link href="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}