"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";

import { searchParamsParsers } from "@/app/search-params";
import { useQueryState } from "nuqs";

export function SearchFilters({ categories }: { categories?: string[] }) {
  const [isLoading, startTransition] = React.useTransition();

  const [q, setQ] = useQueryState(
    "q",
    searchParamsParsers.q.withOptions({
      startTransition,
      shallow: false,
    })
  );

  const [category, setCategory] = useQueryState(
    "category",
    searchParamsParsers.category.withOptions({
      startTransition,
      shallow: false,
    })
  );

  return (
    <div
      className="mb-8 flex flex-col md:flex-row gap-4"
      role="search"
      aria-label="Template filters"
    >
      <div className="flex-1">
        <Input
          placeholder="Search templates..."
          defaultValue={q}
          onChange={(e) => setQ(e.target.value)}
          className="max-w-md"
          aria-label="Search templates"
        />
      </div>

      <>
        {isLoading && (
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
        )}
      </>

      <Select
        value={category}
        onValueChange={setCategory}
        aria-label="Filter by category"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories?.map((category) => (
            <SelectItem key={category} value={category} className="capitalize">
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
