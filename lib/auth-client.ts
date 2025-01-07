import { createAuthClient } from "better-auth/react"
import { adminClient, usernameClient } from "better-auth/client/plugins"
import { toast } from "sonner"

export const authClient = createAuthClient({
  plugins: [adminClient(), usernameClient()],

  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.")
      }
    },
  },
})

export const { signIn, signOut, signUp, useSession } = authClient
