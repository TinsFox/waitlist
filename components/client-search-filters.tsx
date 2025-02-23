"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { searchParamsCache, serialize } from "@/app/search-params";
import { useTransition } from "react";

interface ClientSearchFiltersProps {
  categories: string[];
}

export function ClientSearchFilters({ categories }: ClientSearchFiltersProps) {
  const { q, category } = searchParamsCache.all();

  const updateQValue = (value: string) => {
    serialize("/", {
      q: value,
      category,
    });
  };
  const updateCategoryValue = (value: string) => {
    serialize("/", {
      q,
      category: value,
    });
  };

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
          onChange={(e) => updateQValue(e.target.value)}
          className="max-w-md"
          aria-label="Search templates"
        />
      </div>

      <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
      <Select
        value={category}
        onValueChange={updateCategoryValue}
        aria-label="Filter by category"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
