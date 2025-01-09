"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { navigationData } from "@/components/app-sidebar"

export function AppBreadcrumb() {
  const pathname = usePathname()

  const findNavigationItem = () => {
    for (const section of navigationData) {
      for (const item of section.items) {
        if (pathname.startsWith(item.url) && item.url !== "#") {
          if (item.items) {
            const subItem = item.items.find((sub) => pathname === sub.url)
            if (subItem) {
              return {
                section: section.label,
                parent: item.title,
                current: subItem.title,
              }
            }
          }
          return { section: section.label, current: item.title }
        }
      }
    }
    return null
  }

  const breadcrumbData = findNavigationItem()

  if (!breadcrumbData) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbData.section && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">{breadcrumbData.section}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        )}
        {breadcrumbData.parent && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{breadcrumbData.parent}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{breadcrumbData.current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
