'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Moon, Sun, Rocket, Cpu, Wifi, Globe2, Terminal } from "lucide-react";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[800px] h-[800px] bg-blue-500/30 dark:bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="border border-neutral-200 dark:border-neutral-800"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </Button>
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
            Join the waitlist for the next generation of AI-powered development tools.
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
  );
}