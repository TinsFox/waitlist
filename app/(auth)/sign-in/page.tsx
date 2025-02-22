"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { signIn } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

import { motion } from "framer-motion"

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
})

type SignInValues = z.infer<typeof signInSchema>

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (session && !isPending) {
      const timer = setTimeout(() => {
        router.replace("/dashboard")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [session, isPending, router])

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(data: SignInValues) {
    setLoading(true)
    try {
      await signIn.email(
        {
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {
            setLoading(true)
          },
          onResponse: () => {
            setLoading(false)
          },
          onError: (ctx) => {
            toast.error(ctx.error.message)
          },
        }
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#000000] px-4">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white dark:from-[#1F1F1F] dark:to-black" />
        <div className="absolute top-[-10%] right-[0%] w-[500px] h-[500px] bg-blue-500/5 dark:bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[0%] w-[500px] h-[500px] bg-purple-500/5 dark:bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {session && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.24, 0.25, 0.05, 1]
            }}
            className="bg-[#F5F5FF] dark:bg-[#1F1F3D] border border-[#E5E5FF] dark:border-[#2F2F5F]
              rounded-md p-3.5 mb-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.4
              }}
              className="flex items-center justify-center space-x-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
              <p className="text-sm text-[#4B4B60] dark:text-[#E5E5FF] font-medium">
                Signed in successfully. Redirecting...
              </p>
            </motion.div>
          </motion.div>
        )}

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white mb-2">
            Sign in to continue
          </h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            Enter your details to access your account
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`space-y-4 ${session ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 dark:text-neutral-200">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      className="h-11 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-[#333333]
                        text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-neutral-500
                        focus:border-gray-300 dark:focus:border-neutral-400
                        focus:ring-1 focus:ring-gray-300 dark:focus:ring-neutral-400
                        transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-sm text-gray-700 dark:text-neutral-200">
                      Password
                    </FormLabel>
                    <Link
                      href="/forget-password"
                      className="text-xs text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="h-11 bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-[#333333]
                        text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-neutral-500
                        focus:border-gray-300 dark:focus:border-neutral-400
                        focus:ring-1 focus:ring-gray-300 dark:focus:ring-neutral-400
                        transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-gray-300 dark:border-neutral-600
                        data-[state=checked]:bg-gray-900 dark:data-[state=checked]:bg-white
                        data-[state=checked]:border-gray-900 dark:data-[state=checked]:border-white"
                    />
                  </FormControl>
                  <FormLabel className="text-sm text-gray-500 dark:text-neutral-400 font-normal">
                    Stay signed in
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-neutral-100
                text-white dark:text-black font-medium transition-colors"
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>

            <div className="text-center pt-2">
              <p className="text-gray-500 dark:text-neutral-400 text-sm">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-neutral-200 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
