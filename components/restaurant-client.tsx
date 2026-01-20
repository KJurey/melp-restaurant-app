"use client";

import { useState, useMemo } from "react";
import { Restaurant, SortOption } from "@/types";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useRestaurantFilter } from "@/hooks/useRestaurantFilter";
import { MapFilters } from "@/components/features/map/map-filters";
import { RestaurantGrid } from "@/components/features/restaurant/restaurant-grid";
import { FilterBar } from "@/components/filter-bar";

const MapView = dynamic(() => import("@/components/features/map/map-view"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  ),
});

type ViewMode = "list" | "map";

interface RestaurantsClientProps {
  initialRestaurants: Restaurant[];
}

export function RestaurantsClient({
  initialRestaurants,
}: RestaurantsClientProps) {
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const [centerLat, setCenterLat] = useState(19.4326);
  const [centerLng, setCenterLng] = useState(-99.1332);
  const [radiusMeters, setRadiusMeters] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(4);

  const { filteredRestaurants, statistics } = useRestaurantFilter({
    restaurants: initialRestaurants,
    centerLat,
    centerLng,
    radiusMeters,
    minRating,
    maxRating,
    enabled: viewMode === "map",
  });

  const sortedRestaurants = useMemo(() => {
    const items = [...filteredRestaurants];

    switch (sortBy) {
      case "rating":
        return items.sort((a, b) => b.rating - a.rating);
      case "alphabetical-asc":
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case "alphabetical-desc":
        return items.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return items;
    }
  }, [filteredRestaurants, sortBy]);

  const handleFacebookShare = (restaurant: Restaurant) => {
    const text = encodeURIComponent(
      `Check out ${restaurant.name}! Rated ${restaurant.rating}/5 stars 🌟`,
    );
    const url = encodeURIComponent(window.location.origin + "/restaurants");
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleMapCenterChange = (lat: number, lng: number) => {
    setCenterLat(lat);
    setCenterLng(lng);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">Melp</h1>
          <p className="text-gray-600 mt-2">
            Discover the best restaurants in your city
          </p>
        </div>
      </header>

      <FilterBar
        viewMode={viewMode}
        sortBy={sortBy}
        onViewChange={setViewMode}
        onSortChange={setSortBy}
        centerLat={centerLat}
        centerLng={centerLng}
        radiusMeters={radiusMeters}
        minRating={minRating}
        maxRating={maxRating}
        onCenterLatChange={setCenterLat}
        onCenterLngChange={setCenterLng}
        onRadiusChange={setRadiusMeters}
        onRatingRangeChange={(min, max) => {
          setMinRating(min);
          setMaxRating(max);
        }}
      />

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {viewMode === "map" && (
          <MapFilters
            centerLat={centerLat}
            centerLng={centerLng}
            statistics={statistics}
            restaurants={sortedRestaurants}
          />
        )}

        <div className="flex-1">
          {viewMode === "list" ? (
            <RestaurantGrid
              restaurants={sortedRestaurants}
              onShare={handleFacebookShare}
            />
          ) : (
            <div className="h-[400px] sm:h-[500px] lg:h-[calc(100vh-180px)]">
              <MapView
                center={[centerLat, centerLng]}
                radius={radiusMeters}
                restaurants={sortedRestaurants}
                onCenterChange={handleMapCenterChange}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
