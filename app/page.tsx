"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import * as motion from "motion/react-client"
import { waitlists } from "./data/waitlists"
import { TemplatePreview } from "@/components/template-preview"
import { ThemeToggle } from "@/components/theme-toggle"
import { SquareArrowOutUpRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.1] dark:opacity-[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_400px,hsl(var(--primary))_4%,transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_400px,hsl(var(--primary))_12%,transparent)]" />
      </div>

      <main
        className="container mx-auto px-4 py-16 relative"
        role="main"
        aria-label="Template showcase page"
      >
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-block">
            <Badge className="mb-4" variant="secondary">
              ✨ Waitlist Templates
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Professional Product Waitlist Templates
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground">
            Carefully designed waitlist templates to help you quickly build
            professional product reservation pages and improve conversion rates
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {waitlists.map((waitlist, index) => (
            <motion.div
              key={waitlist.id}
              role="listitem"
              aria-label={`${waitlist.title} template`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group border border-border/40 bg-background/60 dark:bg-card/80 backdrop-blur-xl transition-all duration-300 hover:border-border/60 hover:shadow-lg dark:hover:border-border/30 h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {waitlist.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-border/40 bg-background/60 text-muted-foreground group-hover:bg-background/80 group-hover:border-border/60 transition-colors"
                    >
                      {waitlist.joinedCount}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-4 text-foreground/90 group-hover:text-foreground transition-colors">
                    {waitlist.title}
                  </CardTitle>
                  <CardDescription className="min-h-[48px] text-muted-foreground">
                    {waitlist.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <TemplatePreview template={waitlist} />
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full relative overflow-hidden group/button bg-primary hover:bg-primary/90"
                    size="lg"
                    variant="default"
                    asChild
                  >
                    <Link href={waitlist.link} target="_blank">
                      <span className="relative z-10 flex items-center">
                        Live Preview
                        <SquareArrowOutUpRight className="w-4 h-4 ml-2" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground/20 opacity-0 group-hover/button:opacity-100 transition-opacity" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
