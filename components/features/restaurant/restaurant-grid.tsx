import { Restaurant } from "@/types";
import { RestaurantCard } from "./restaurant-card";

interface RestaurantGridProps {
  restaurants: Restaurant[];
  onShare: (restaurant: Restaurant) => void;
}

export function RestaurantGrid({ restaurants, onShare }: RestaurantGridProps) {
  if (restaurants.length === 0) {
    return (
      <div className="col-span-full text-center py-16 text-gray-500">
        <p className="text-lg">No restaurants available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onShare={onShare}
        />
      ))}
    </div>
  );
}
