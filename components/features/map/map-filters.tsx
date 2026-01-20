import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Restaurant } from "@/types";
import { RecommendationCard } from "./recommendation-card";
import { getDistanceInMeters } from "@/utils/get-distance";
import { TrendingUp, Star, BarChart3 } from "lucide-react";

interface MapFiltersProps {
  centerLat: number;
  centerLng: number;
  statistics: {
    count: number;
    avgRating: number;
    stdDev: number;
  };
  restaurants: Restaurant[];
}

export function MapFilters({
  centerLat,
  centerLng,
  statistics,
  restaurants,
}: MapFiltersProps) {
  const recommendations = useMemo(() => {
    return restaurants
      .map((restaurant) => ({
        restaurant,
        distance: getDistanceInMeters(
          centerLat,
          centerLng,
          restaurant.address.location.lat,
          restaurant.address.location.lng,
        ),
      }))
      .sort((a, b) => {
        // Sort by rating first, then distance
        if (Math.abs(b.restaurant.rating - a.restaurant.rating) > 0.1) {
          return b.restaurant.rating - a.restaurant.rating;
        }
        return a.distance - b.distance;
      })
      .slice(0, 10);
  }, [restaurants, centerLat, centerLng]);

  return (
    <aside className="lg:w-90 bg-white border-r overflow-y-auto h-[calc(100vh-180px)]">
      <div className="p-4 space-y-4">
        {/* Statistics Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 gap-2">
          <CardHeader className="p-4 pb-0 pt-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Area Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <div className="flex justify-between items-center text-md">
              <span className="text-gray-600">Restaurants</span>
              <span className="font-semibold text-blue-900">
                {statistics.count}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Rating</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-blue-900">
                  {statistics.avgRating.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Std Deviation</span>
              <span className="font-semibold text-blue-900">
                {statistics.stdDev.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Top Recommendations
            </CardTitle>
            <p className="text-md text-gray-500 mt-1">
              Best rated restaurants nearby
            </p>
          </CardHeader>
          <CardContent className="p-4 pt-2 space-y-2">
            {recommendations.length > 0 ? (
              recommendations.map(({ restaurant, distance }) => (
                <RecommendationCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  distance={distance}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-xs text-gray-500">
                  No restaurants in this area
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try increasing the radius
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
