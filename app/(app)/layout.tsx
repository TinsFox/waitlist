import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.1] dark:opacity-[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_400px,hsl(var(--primary))_4%,transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_400px,hsl(var(--primary))_12%,transparent)]" />
      </div>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  )
}
