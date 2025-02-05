import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Rocket, Cpu, Wifi, Globe2, Terminal, Github } from "lucide-react"
import Link from "next/link"

function Header() {
  return (
    <header className="fixed top-0 w-full border-b border-neutral-200 dark:border-neutral-800 bg-background/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Cpu className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-xl">TechPulse</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#" className="text-sm hover:text-blue-500 transition-colors">
              Features
            </Link>
            <Link href="#" className="text-sm hover:text-blue-500 transition-colors">
              Documentation
            </Link>
            <Link href="#" className="text-sm hover:text-blue-500 transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" className="hidden sm:flex">
              Sign In
            </Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-blue-500">Features</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-blue-500">Pricing</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-blue-500">Documentation</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-blue-500">About</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-blue-500">Blog</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-blue-500">Careers</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-blue-500">Community</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-blue-500">Contact</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-blue-500">Support</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-blue-500">Privacy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-blue-500">Terms</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-blue-500">License</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-muted-foreground">
            © 2024 TechPulse. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-blue-500">
              <Github className="h-5 w-5" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function TechPulse() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[800px] h-[800px] bg-blue-500/30 dark:bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center text-center space-y-8 pt-12">
            {/* Animated Tech Icons */}
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                <Cpu className="w-12 h-12 text-blue-500" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center animate-spin-slow opacity-30">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-blue-500" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              The Future of
              <span className="block mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI Technology
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
              Join the waitlist for the next generation of AI-powered
              development tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[500px] relative">
              <div className="absolute -z-10 blur-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 w-full h-full" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 bg-background/80 backdrop-blur-sm border-neutral-200 dark:border-neutral-800"
              />
              <Button className="h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                Join Beta
                <Terminal className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Stats with Tech Border */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 w-full max-w-[800px] p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-background/50 backdrop-blur-sm">
              <div className="space-y-2 relative">
                <Globe2 className="w-6 h-6 text-blue-500 mb-2" />
                <p className="text-4xl font-bold">150k+</p>
                <p className="text-sm text-muted-foreground">Global Users</p>
              </div>
              <div className="space-y-2">
                <Wifi className="w-6 h-6 text-purple-500 mb-2" />
                <p className="text-4xl font-bold">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div className="space-y-2">
                <Cpu className="w-6 h-6 text-pink-500 mb-2" />
                <p className="text-4xl font-bold">10ms</p>
                <p className="text-sm text-muted-foreground">Latency</p>
              </div>
              <div className="space-y-2">
                <Rocket className="w-6 h-6 text-blue-500 mb-2" />
                <p className="text-4xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
