"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Sparkles, Code2, Boxes, Workflow } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export default function NeonNext() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Handle form submission
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#0ea5e9,#6366f1)] opacity-[0.15] dark:opacity-20 animate-gradient" />

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Header */}
      <header className="w-full border-b border-border/40 backdrop-blur-sm bg-background/80 relative z-50">
        <div className="container max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              NeonNext
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Docs
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
        {/* Add a gradient fade effect below header */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-background/80 to-transparent pointer-events-none" />
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Floating Elements - adjust positions */}
        <div className="absolute top-40 left-20 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-2s" }}
        />

        <div className="container max-w-[1200px] mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col items-center space-y-8">
            {/* Animated Badge */}
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary backdrop-blur-sm hover:bg-primary/20 cursor-pointer group">
              <Sparkles className="mr-1 h-3 w-3 animate-pulse-slow" />
              <span className="relative">
                Coming Soon
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
              </span>
            </div>

            {/* Hero Text with Gradient */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-[900px] [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 pb-2 animate-gradient bg-[size:400%_400%]">
              Build the future of development
            </h1>

            <p className="text-lg text-muted-foreground max-w-[600px] text-center leading-relaxed">
              Join thousands of developers revolutionizing the way we build
              software. Be the first to experience the next generation of
              development tools.
            </p>

            {/* Email Input with Animation */}
            <div className="flex flex-col sm:flex-row w-full max-w-[500px] gap-3 group/form">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full flex flex-col sm:flex-row gap-3"
                >
                  <div className="relative flex-1">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover/form:opacity-75 transition duration-1000"></div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              className="relative h-12 bg-background/80 backdrop-blur-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-500 shadow-lg hover:shadow-blue-500/25"
                  >
                    Join Waitlist
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </Form>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1000px] mt-16">
              <div className="group p-6 backdrop-blur-sm bg-background/50 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <Code2 className="h-6 w-6 mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Smart Coding</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced AI assistance that understands your codebase deeply.
                </p>
              </div>
              <div className="group p-6 backdrop-blur-sm bg-background/50 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <Boxes className="h-6 w-6 mb-4 text-purple-500" />
                <h3 className="text-lg font-semibold mb-2">Modular Design</h3>
                <p className="text-sm text-muted-foreground">
                  Build complex systems from simple, reusable components.
                </p>
              </div>
              <div className="group p-6 backdrop-blur-sm bg-background/50 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <Workflow className="h-6 w-6 mb-4 text-pink-500" />
                <h3 className="text-lg font-semibold mb-2">Seamless Flow</h3>
                <p className="text-sm text-muted-foreground">
                  Streamlined workflows that adapt to your development style.
                </p>
              </div>
            </div>

            {/* Stats with Animation */}
            <div className="w-full max-w-[800px] mt-16">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
                <div className="flex flex-col items-center py-4">
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    50k+
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Active Users
                  </p>
                </div>
                <div className="flex flex-col items-center py-4">
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                    200ms
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Response Time
                  </p>
                </div>
                <div className="flex flex-col items-center py-4">
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                    99.9%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 backdrop-blur-sm bg-background/80 relative z-50">
        <div className="container max-w-[1200px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                NeonNext
              </div>
              <p className="text-sm text-muted-foreground">
                Building the future of development tools with cutting-edge
                technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Updates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    License
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} NeonNext. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
