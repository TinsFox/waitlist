"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Send, Trash } from "lucide-react"
import type { Waitlist } from "@/lib/db/schema"

interface WaitlistActionsProps {
  waitlist: Waitlist
}

export function WaitlistActions({ waitlist }: WaitlistActionsProps) {
  const handleSendEmail = () => {
    console.log("Send Email")
  }
  const handleDelete = () => {
    console.log("Delete")
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelectCapture={handleSendEmail}>
          <Send className="mr-2 h-4 w-4" />
          Send Email
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
