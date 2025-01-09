"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useQueryState } from "nuqs"

interface PaginationControlsProps {
  total: number
}

export function PaginationControls({ total }: PaginationControlsProps) {
  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
    parse: (value) => value,
  })
  const [perPage] = useQueryState("per_page", {
    defaultValue: "10",
    parse: (value) => value,
  })

  const totalPages = Math.ceil(total / Number(perPage))
  const currentPage = Number(page)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => setPage(String(currentPage - 1))}
            isActive={currentPage > 1}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => setPage(String(i + 1))}
              isActive={currentPage === i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => setPage(String(currentPage + 1))}
            isActive={currentPage < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
