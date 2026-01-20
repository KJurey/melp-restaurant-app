"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { RadiusSearchResult } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Loader2, Search } from "lucide-react";

const MapView = dynamic(() => import("./map-view"), { ssr: false });

export function MapSearch() {
  const [centerLat, setCenterLat] = useState(19.4326);
  const [centerLng, setCenterLng] = useState(-99.1332);
  const [radiusMeters, setRadiusMeters] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(4);
  const [searchResult, setSearchResult] = useState<RadiusSearchResult | null>(
    null,
  );
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async () => {
    setIsSearching(true);
    try {
      const params = new URLSearchParams({
        lat: centerLat.toString(),
        lng: centerLng.toString(),
        radius: radiusMeters.toString(),
        minRating: minRating.toString(),
        maxRating: maxRating.toString(),
      });

      const res = await fetch(`/api/restaurants/search?${params}`);
      const data = await res.json();
      setSearchResult(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Search Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Latitude</Label>
            <Input
              type="number"
              step="0.0001"
              value={centerLat}
              onChange={(e) => setCenterLat(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <Label>Longitude</Label>
            <Input
              type="number"
              step="0.0001"
              value={centerLng}
              onChange={(e) => setCenterLng(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <Label>Radius: {radiusMeters}m</Label>
            <Slider
              value={[radiusMeters]}
              onValueChange={(val) => setRadiusMeters(val[0])}
              min={100}
              max={5000}
              step={100}
            />
          </div>

          <div>
            <Label>
              Rating Range: {minRating} - {maxRating}
            </Label>
            <Slider
              value={[minRating, maxRating]}
              onValueChange={(val) => {
                setMinRating(val[0]);
                setMaxRating(val[1]);
              }}
              min={0}
              max={4}
              step={0.5}
            />
          </div>

          <Button
            onClick={performSearch}
            disabled={isSearching}
            className="w-full"
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" /> Search
              </>
            )}
          </Button>

          {searchResult && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-2">
              <p className="font-semibold">Results:</p>
              <p>Restaurants: {searchResult.count}</p>
              <p>Avg Rating: {searchResult.averageRating.toFixed(2)}</p>
              <p>Std Dev: {searchResult.standardDeviation.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        <MapView
          center={[centerLat, centerLng]}
          radius={radiusMeters}
          restaurants={searchResult?.restaurants || []}
        />
      </div>
    </div>
  );
}
