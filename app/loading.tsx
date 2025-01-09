import { Loading } from "@/components/ui/loading"

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-background/80">
      <div className="relative z-10">
        <Loading size="lg" text="Loading..." />
      </div>

      {/* Background gradient effects */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute h-[600px] w-[600px] rotate-12 animate-pulse rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute h-[500px] w-[500px] -rotate-12 animate-pulse rounded-full bg-primary/3 blur-[120px]" />
      </div>
    </div>
  )
}
