"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createWaitlistEntry } from "@/lib/actions/waitlist"
import { toast } from "sonner"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await createWaitlistEntry({
        email,
        createdAt: new Date(),
      })

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Successfully joined the waitlist!")
        setEmail("")
      }
    } catch (error) {
      console.error("Error creating waitlist entry:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Joining..." : "Join Waitlist"}
      </Button>
    </form>
  )
}
