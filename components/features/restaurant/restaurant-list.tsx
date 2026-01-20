"use client";

import { useState, useMemo, useEffect } from "react";
import { Restaurant, SortOption } from "@/types";
import { RestaurantCard } from "./restaurant-card";
import { SortControls } from "@/components/sort-controls";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/restaurants");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        setRestaurants(json.data || []);
        setErrorMsg(null);
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : "Failed to load data");
        setRestaurants([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  const sortedRestaurants = useMemo(() => {
    const items = [...restaurants];

    return sortBy === "rating"
      ? items.sort((a, b) => b.rating - a.rating)
      : items.sort((a, b) => a.name.localeCompare(b.name));
  }, [restaurants, sortBy]);

  const handleFacebookShare = (restaurant: Restaurant) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`Check out ${restaurant.name} - Rated ${restaurant.rating}/5 stars!`)}`;
    window.open(shareUrl, "_blank", "width=600,height=400,scrollbars=yes");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-gray-600 font-medium">Loading restaurants...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <SortControls currentSort={sortBy} onSortChange={setSortBy} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {sortedRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onShare={handleFacebookShare}
          />
        ))}
      </div>

      {sortedRestaurants.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No restaurants available</p>
        </div>
      )}
    </div>
  );
}
