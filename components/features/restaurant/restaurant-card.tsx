"use client";

import { Restaurant } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, MapPin, Phone, Mail, Globe, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onShare?: (restaurant: Restaurant) => void;
}

export function RestaurantCard({ restaurant, onShare }: RestaurantCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const placeholderImage = `https://picsum.photos/400/300?random=${encodeURIComponent(restaurant.name)}`;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full bg-gray-200 flex-shrink-0">
        <Image
          src={placeholderImage}
          alt={restaurant.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Like button overlay */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">{renderStars(restaurant.rating)}</div>
              <span className="text-sm font-medium text-gray-700">
                {restaurant.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 pt-0">
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            {restaurant.address.street}, {restaurant.address.city},{" "}
            {restaurant.address.state}
          </span>
        </div>

        <div className="space-y-1.5">
          {restaurant.contact.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <a
                href={`tel:${restaurant.contact.phone}`}
                className="hover:text-blue-600"
              >
                {restaurant.contact.phone}
              </a>
            </div>
          )}

          {restaurant.contact.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <a
                href={`mailto:${restaurant.contact.email}`}
                className="hover:text-blue-600"
              >
                {restaurant.contact.email}
              </a>
            </div>
          )}

          {restaurant.contact.site && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="w-4 h-4" />
              <a
                href={restaurant.contact.site}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                Visit Website
              </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 flex-shrink-0 mt-auto pt-4">
          <Button
            onClick={handleLike}
            variant={isLiked ? "default" : "outline"}
            size="sm"
            className="w-full"
          >
            <Heart
              className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`}
            />
            {isLiked ? "Liked" : "Like"}
          </Button>

          {onShare && (
            <Button
              onClick={() => onShare(restaurant)}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
