"use client";

import { SortOption } from "@/types";
import { Button } from "@/components/ui/button";
import { Star, ArrowDownAZ, ArrowUpZA } from "lucide-react";

interface SortControlsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function SortControls({ currentSort, onSortChange }: SortControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 hidden sm:inline">
        Sort:
      </span>

      <div className="flex gap-2">
        <Button
          variant={currentSort === "rating" ? "default" : "outline"}
          size="sm"
          onClick={() => onSortChange("rating")}
          className="flex items-center gap-2"
        >
          <Star className="w-4 h-4" />
          <span className="hidden sm:inline">Rating</span>
        </Button>

        <Button
          variant={currentSort === "alphabetical-asc" ? "default" : "outline"}
          size="sm"
          onClick={() => onSortChange("alphabetical-asc")}
          className="flex items-center gap-2"
        >
          <ArrowDownAZ className="w-4 h-4" />
          <span className="hidden sm:inline">A-Z</span>
        </Button>

        <Button
          variant={currentSort === "alphabetical-desc" ? "default" : "outline"}
          size="sm"
          onClick={() => onSortChange("alphabetical-desc")}
          className="flex items-center gap-2"
        >
          <ArrowUpZA className="w-4 h-4" />
          <span className="hidden sm:inline">Z-A</span>
        </Button>
      </div>
    </div>
  );
}
