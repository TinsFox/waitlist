import { atom } from "jotai"
import { WaitlistTemplate } from "@/app/data/waitlists"

export const previewAtom = atom<{
  isOpen: boolean
  templates: WaitlistTemplate[]
  currentIndex: number
}>({
  isOpen: false,
  templates: [],
  currentIndex: 0,
})
