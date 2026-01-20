import { useMemo } from "react";
import { Restaurant } from "@/types";
import { getDistanceInMeters } from "@/utils/get-distance";
import { computeStandardDeviation } from "@/utils/standard-deviation";

interface FilterParams {
  restaurants: Restaurant[];
  centerLat: number;
  centerLng: number;
  radiusMeters: number;
  minRating: number;
  maxRating: number;
  enabled: boolean;
}

export function useRestaurantFilter({
  restaurants,
  centerLat,
  centerLng,
  radiusMeters,
  minRating,
  maxRating,
  enabled,
}: FilterParams) {
  const filteredRestaurants = useMemo(() => {
    if (!enabled) return restaurants;

    return restaurants.filter((restaurant) => {
      const distance = getDistanceInMeters(
        centerLat,
        centerLng,
        restaurant.address.location.lat,
        restaurant.address.location.lng,
      );

      return (
        distance <= radiusMeters &&
        restaurant.rating >= minRating &&
        restaurant.rating <= maxRating
      );
    });
  }, [
    restaurants,
    centerLat,
    centerLng,
    radiusMeters,
    minRating,
    maxRating,
    enabled,
  ]);

  const statistics = useMemo(() => {
    if (filteredRestaurants.length === 0) {
      return { count: 0, avgRating: 0, stdDev: 0 };
    }

    const ratings = filteredRestaurants.map((r) => r.rating);
    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    const stdDev = computeStandardDeviation(ratings);

    return {
      count: filteredRestaurants.length,
      avgRating: avg,
      stdDev: stdDev,
    };
  }, [filteredRestaurants]);

  return { filteredRestaurants, statistics };
}
