"use client"

import * as React from "react"
import {
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  List,
  Users,
  Folder,
  Share,
  Trash2,
  Mail,
  FileText,
  Share2,
  BarChart,
} from "lucide-react"
import Link from "next/link"

import { NavGroup } from "@/components/nav-group"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { NavSection } from "@/types/navigation"

export const navigationData: NavSection[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: PieChart,
      },
      {
        title: "Waitlists",
        url: "/waitlists",
        icon: List,
        items: [
          {
            title: "Users",
            url: "/users",
          },
          {
            title: "Active Lists",
            url: "/users/active",
          },
          {
            title: "Archived",
            url: "/users/archived",
          },
        ],
      },
      {
        title: "User Management",
        url: "/users",
        icon: Users,
        items: [
          {
            title: "User List",
            url: "/users/list",
          },
          {
            title: "User Analytics",
            url: "/users/analytics",
          },
          {
            title: "Invitations",
            url: "/users/invitations",
          },
        ],
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "Campaigns",
        url: "/campaigns",
        icon: Send,
      },
      {
        title: "Email Templates",
        url: "/email-templates",
        icon: Mail,
      },
      {
        title: "Form Builder",
        url: "/forms",
        icon: FileText,
      },
      {
        title: "Integrations",
        url: "/integrations",
        icon: Share2,
      },
      {
        title: "Send Email",
        url: "/email",
        icon: Mail,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "/settings/general",
          },
          {
            title: "API",
            url: "/settings/api",
          },
          {
            title: "Billing",
            url: "/settings/billing",
          },
        ],
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart,
        items: [
          {
            title: "Conversion",
            url: "/analytics/conversion",
          },
          {
            title: "Growth",
            url: "/analytics/growth",
          },
        ],
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        title: "Landing Pages",
        url: "/",
        icon: FileText,
        target: "_blank",
      },
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
    className: "mt-auto",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">af Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navigationData.map((section) => (
          <NavGroup
            key={section.label}
            label={section.label}
            items={section.items}
            hideOnCollapse={section.hideOnCollapse}
            showMoreButton={section.showMoreButton}
            className={section.className}
          />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
