"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

export default function ResetPassword() {
  const router = useRouter()
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: ResetPasswordForm) {
    try {
      await authClient.resetPassword({
        newPassword: data.password,
      })
      toast.success("Password reset successfully")
      router.push("/sign-in")
    } catch (error) {
      console.error(error)
      toast.error("Failed to reset password. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/95 px-4">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
      <Card className="w-full max-w-md border-neutral-800 bg-black/60 backdrop-blur-xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-medium text-white">
            Reset password
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Enter your new password and confirm it to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">
                      New password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        className="border-neutral-800 bg-neutral-900/50 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-700 focus:ring-neutral-700"
                        placeholder="Enter your new password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        className="border-neutral-800 bg-neutral-900/50 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-700 focus:ring-neutral-700"
                        placeholder="Confirm your new password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all duration-300"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Reset password"
                )}
              </Button>

              <div className="text-center">
                <p className="text-neutral-400 text-sm">
                  Remember your password?{" "}
                  <a
                    href="/sign-in"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
