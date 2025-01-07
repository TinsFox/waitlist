'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Moon, Sun, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-500/10 via-violet-500/10 to-transparent -z-10" />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="container max-w-[1200px] mx-auto px-4 py-24">
        <div className="flex flex-col items-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
            <Sparkles className="mr-1 h-3 w-3" />
            Coming Soon
          </div>

          {/* Hero Text */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-[800px] [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            The future of software development is here
          </h1>

          <p className="text-lg text-muted-foreground max-w-[600px] text-center">
            Join thousands of developers already using our platform to build better software, faster.
          </p>

          {/* Email Input */}
          <div className="flex flex-col sm:flex-row w-full max-w-[400px] gap-3">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="h-12 bg-background/80"
            />
            <Button className="h-12 px-8">
              Join Waitlist
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="w-full max-w-[800px] mt-16">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-border/40 pt-8">
              <div>
                <p className="text-3xl font-bold">50k+</p>
                <p className="text-sm text-muted-foreground mt-1">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold">200ms</p>
                <p className="text-sm text-muted-foreground mt-1">Response Time</p>
              </div>
              <div>
                <p className="text-3xl font-bold">99.9%</p>
                <p className="text-sm text-muted-foreground mt-1">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}