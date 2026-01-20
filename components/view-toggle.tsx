"use client";

import { Button } from "@/components/ui/button";
import { List, MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "list" | "map";

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2 bg-white rounded-lg border p-1">
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("list")}
        className={cn("flex items-center gap-2")}
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">List</span>
      </Button>

      <Button
        variant={view === "map" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("map")}
        className={cn("flex items-center gap-2")}
      >
        <MapIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Map</span>
      </Button>
    </div>
  );
}
