"use client";

import { SortOption } from "@/types";
import { SortControls } from "@/components/sort-controls";
import { ViewToggle } from "@/components/view-toggle";
import { MapControls } from "./features/map/map-controls";

type ViewMode = "list" | "map";

interface FilterBarProps {
  viewMode: ViewMode;
  sortBy: SortOption;
  onViewChange: (view: ViewMode) => void;
  onSortChange: (sort: SortOption) => void;

  centerLat?: number;
  centerLng?: number;
  radiusMeters?: number;
  minRating?: number;
  maxRating?: number;
  onCenterLatChange?: (value: number) => void;
  onCenterLngChange?: (value: number) => void;
  onRadiusChange?: (value: number) => void;
  onRatingRangeChange?: (min: number, max: number) => void;
}

export function FilterBar({
  viewMode,
  sortBy,
  onViewChange,
  onSortChange,
  centerLat,
  centerLng,
  radiusMeters,
  minRating,
  maxRating,
  onCenterLatChange,
  onCenterLngChange,
  onRadiusChange,
  onRatingRangeChange,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-[1000] bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex-1">
            {viewMode === "list" ? (
              <SortControls currentSort={sortBy} onSortChange={onSortChange} />
            ) : (
              <MapControls
                centerLat={centerLat || 0}
                centerLng={centerLng || 0}
                radiusMeters={radiusMeters || 2000}
                minRating={minRating || 0}
                maxRating={maxRating || 4}
                onCenterLatChange={onCenterLatChange || (() => {})}
                onCenterLngChange={onCenterLngChange || (() => {})}
                onRadiusChange={onRadiusChange || (() => {})}
                onRatingRangeChange={onRatingRangeChange || (() => {})}
              />
            )}
          </div>

          <ViewToggle view={viewMode} onViewChange={onViewChange} />
        </div>
      </div>
    </div>
  );
}
