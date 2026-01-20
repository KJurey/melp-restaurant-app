import { Restaurant } from "@/types";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface RecommendationCardProps {
  restaurant: Restaurant;
  distance: number;
}

export function RecommendationCard({
  restaurant,
  distance,
}: RecommendationCardProps) {
  const placeholderImage = `https://picsum.photos/400/300?random=${encodeURIComponent(restaurant.name)}`;

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
      <div className="flex gap-3">
        <div className="relative h-20 w-20 flex-shrink-0 bg-gray-200">
          <Image
            src={placeholderImage}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        <CardContent className="p-3 flex-1">
          <h4 className="font-semibold text-sm line-clamp-1">
            {restaurant.name}
          </h4>

          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < restaurant.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs text-gray-700 ml-1">
              {restaurant.rating}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
            <MapPin className="w-3 h-3" />
            <span>
              {distance < 1000
                ? `${Math.round(distance)}m`
                : `${(distance / 1000).toFixed(1)}km`}
            </span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
