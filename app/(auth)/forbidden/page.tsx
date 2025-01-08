import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Forbidden
        </h1>
        <p className="mt-4 text-base text-gray-500 sm:mt-6">
          Sorry, you are not authorized to access this page.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/">
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}