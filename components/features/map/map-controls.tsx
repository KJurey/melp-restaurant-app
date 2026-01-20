"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface MapControlsProps {
  centerLat: number;
  centerLng: number;
  radiusMeters: number;
  minRating: number;
  maxRating: number;
  onCenterLatChange: (value: number) => void;
  onCenterLngChange: (value: number) => void;
  onRadiusChange: (value: number) => void;
  onRatingRangeChange: (min: number, max: number) => void;
}

export function MapControls({
  centerLat,
  centerLng,
  radiusMeters,
  minRating,
  maxRating,
  onCenterLatChange,
  onCenterLngChange,
  onRadiusChange,
  onRatingRangeChange,
}: MapControlsProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Map Filters</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 z-[1001]" align="start">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-3">Search Area</h4>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <Label className="text-xs">Latitude</Label>
                  <Input
                    type="number"
                    step="0.0001"
                    value={centerLat?.toFixed(4)}
                    onChange={(e) =>
                      onCenterLatChange?.(parseFloat(e.target.value) || 0)
                    }
                    className="mt-1 h-8 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Longitude</Label>
                  <Input
                    type="number"
                    step="0.0001"
                    value={centerLng?.toFixed(4)}
                    onChange={(e) =>
                      onCenterLngChange?.(parseFloat(e.target.value) || 0)
                    }
                    className="mt-1 h-8 text-xs"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                💡 Click on the map to set location
              </p>
            </div>

            <div>
              <Label className="text-sm">Radius: {radiusMeters}m</Label>
              <Slider
                value={[radiusMeters || 2000]}
                onValueChange={(val) => onRadiusChange?.(val[0])}
                min={100}
                max={5000}
                step={100}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm">
                Rating: {minRating} - {maxRating}
              </Label>
              <Slider
                value={[minRating || 0, maxRating || 4]}
                onValueChange={(val) => onRatingRangeChange?.(val[0], val[1])}
                min={0}
                max={4}
                step={0.5}
                className="mt-2"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
