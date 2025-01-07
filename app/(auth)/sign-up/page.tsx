"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import { Loader2, X } from "lucide-react"
import { signUp } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
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

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })

type SignUpValues = z.infer<typeof signUpSchema>

export default function SignUp() {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(data: SignUpValues) {
    await signUp.email({
      email: data.email,
      password: data.password,
      name: `${data.firstName} ${data.lastName}`,
      image: image ? await convertImageToBase64(image) : "",
      callbackURL: "/dashboard",
      fetchOptions: {
        onResponse: () => setLoading(false),
        onRequest: () => setLoading(true),
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
        onSuccess: async () => router.push("/dashboard"),
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/95 px-4">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
      <Card className="w-full max-w-md border-neutral-800 bg-black/60 backdrop-blur-xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-medium text-white">
            Create your account
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-200">
                        First name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          className="border-neutral-800 bg-neutral-900/50 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-700 focus:ring-neutral-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-200">
                        Last name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          className="border-neutral-800 bg-neutral-900/50 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-700 focus:ring-neutral-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        className="border-neutral-800 bg-neutral-900/50 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-700 focus:ring-neutral-700"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        className="border-neutral-800 bg-neutral-900/50 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-700 focus:ring-neutral-700"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        className="border-neutral-800 bg-neutral-900/50 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-700 focus:ring-neutral-700"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel className="text-neutral-200">
                  Profile Image (optional)
                </FormLabel>
                <div className="flex items-end gap-4">
                  {imagePreview && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-neutral-700">
                      <Image
                        src={imagePreview}
                        alt="Profile preview"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 w-full">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full border-neutral-800 bg-neutral-900/50 text-neutral-100 file:bg-neutral-800 file:text-neutral-100 file:border-0"
                    />
                    {imagePreview && (
                      <X
                        className="cursor-pointer text-neutral-400 hover:text-neutral-200"
                        onClick={() => {
                          setImage(null)
                          setImagePreview(null)
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Create account"
                )}
              </Button>

              <div className="text-center">
                <p className="text-neutral-400 text-sm">
                  Already have an account?{" "}
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

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
