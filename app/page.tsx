"use client"
import { useState } from "react"
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
import { waitlists, categories } from "./data/waitlists"
import { TemplatePreview } from "@/components/template-preview"
import { ThemeToggle } from "@/components/theme-toggle"
import { SquareArrowOutUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredWaitlists = waitlists.filter((waitlist) => {
    const matchesSearch =
      waitlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      waitlist.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || waitlist.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.1] dark:opacity-[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_400px,hsl(var(--primary))_4%,transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_400px,hsl(var(--primary))_12%,transparent)]" />
      </div>

      <main
        className="flex-1 container mx-auto px-4 py-16 relative"
        role="main"
        aria-label="Template showcase page"
      >
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>

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

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {filteredWaitlists.map((waitlist, index) => (
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

        {filteredWaitlists.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No templates found matching your criteria.
            </p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
