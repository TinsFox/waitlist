"use client"

import { ChevronRight, MoreHorizontal } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import React from "react"
import Link from "next/link"
import type { NavItem } from "@/types/navigation"

interface NavGroupProps {
  label: string
  items: NavItem[]
  className?: string
  showMoreButton?: boolean
  hideOnCollapse?: boolean
}

export function NavGroup({
  label,
  items,
  className,
  showMoreButton = false,
  hideOnCollapse = false,
}: NavGroupProps) {
  const { isMobile } = useSidebar()
  const pathname = usePathname()
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const isActiveLink = (url: string, subItems?: { url: string }[]) => {
    if (url === "#") return false
    if (pathname === url) return true
    return subItems?.some((item) => item.url === pathname) ?? false
  }

  const handleItemClick = (item: NavItem) => {
    if (item.items?.length) {
      setOpenItems((prev) =>
        prev.includes(item.title)
          ? prev.filter((title) => title !== item.title)
          : [...prev, item.title]
      )
    }
  }

  React.useEffect(() => {
    const activeParents = items
      .filter((item) => item.items?.some((subItem) => subItem.url === pathname))
      .map((item) => item.title)
    setOpenItems(activeParents)
  }, [items, pathname])

  return (
    <SidebarGroup
      className={cn(
        hideOnCollapse && "group-data-[collapsible=icon]:hidden",
        className
      )}
    >
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const active = isActiveLink(item.url, item.items)
          const isOpen = openItems.includes(item.title)

          return (
            <Collapsible
              key={item.title}
              asChild
              open={isOpen}
              defaultOpen={active}
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  data-active={active}
                  onClick={() => handleItemClick(item)}
                >
                  <Link
                    href={item.items?.length ? "#" : item.url}
                    target={item.target}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>

                {item.actions ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      {item.actions.map((action, index) => (
                        <React.Fragment key={action.label}>
                          <DropdownMenuItem onClick={action.onClick}>
                            <action.icon className="text-muted-foreground" />
                            <span>{action.label}</span>
                          </DropdownMenuItem>
                          {index < item.actions!.length - 1 && (
                            <DropdownMenuSeparator />
                          )}
                        </React.Fragment>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}

                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger
                      asChild
                      onClick={() => handleItemClick(item)}
                    >
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              data-active={pathname === subItem.url}
                            >
                              <Link href={subItem.url} target={subItem.target}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
        {showMoreButton && (
          <SidebarMenuItem>
            <SidebarMenuButton>
              <MoreHorizontal />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
