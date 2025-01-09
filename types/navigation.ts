import { type LucideIcon } from "lucide-react"

export interface BaseLink {
  title: string
  url: string
  target?: string
}

interface SubNavItem extends BaseLink {}

export interface NavAction {
  icon: LucideIcon
  label: string
  onClick?: () => void
}

export interface NavItem extends BaseLink {
  icon: LucideIcon
  items?: SubNavItem[]
  actions?: NavAction[]
}

export interface NavSection {
  label: string
  items: NavItem[]
  showMoreButton?: boolean
  hideOnCollapse?: boolean
  className?: string
}
