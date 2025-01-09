"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useQueryClient } from "@tanstack/react-query"

interface UserActionsProps {
  user: any // Replace with your user type
}

export function UserActions({ user }: UserActionsProps) {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = async (action: "ban" | "unban" | "delete") => {
    setIsLoading(true)
    try {
      switch (action) {
        case "ban":
          await authClient.admin.banUser({ userId: user.id })
          break
        case "unban":
          await authClient.admin.unbanUser({ userId: user.id })
          break
        case "delete":
          await authClient.admin.removeUser({ userId: user.id })
          break
      }
      queryClient.invalidateQueries({ queryKey: ["users"] })
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user.banned ? (
          <DropdownMenuItem
            onClick={() => handleAction("unban")}
            disabled={isLoading}
          >
            Unban User
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => handleAction("ban")}
            disabled={isLoading}
          >
            Ban User
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => handleAction("delete")}
          disabled={isLoading}
          className="text-red-600"
        >
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
