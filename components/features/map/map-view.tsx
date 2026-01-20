"use client";

import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Restaurant } from "@/types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Star } from "lucide-react";

// Fix default marker icons
const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};
fixLeafletIcons();

// Red marker for search center
const centerMarkerIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapViewProps {
  center: [number, number];
  radius: number;
  restaurants: Restaurant[];
  onCenterChange?: (lat: number, lng: number) => void;
}

function MapClickHandler({
  onCenterChange,
}: {
  onCenterChange?: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: (e) => {
      if (onCenterChange) {
        onCenterChange(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

export default function MapView({
  center,
  radius,
  restaurants,
  onCenterChange,
}: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-full w-full rounded-lg shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler onCenterChange={onCenterChange} />

      <Circle
        center={center}
        radius={radius}
        pathOptions={{
          color: "#3b82f6",
          fillColor: "#3b82f6",
          fillOpacity: 0.1,
          weight: 2,
        }}
      />

      <Marker position={center} icon={centerMarkerIcon}>
        <Popup>
          <div className="text-sm font-semibold">Search Center</div>
          <div className="text-xs text-gray-600">Click map to move</div>
        </Popup>
      </Marker>

      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={[
            restaurant.address.location.lat,
            restaurant.address.location.lng,
          ]}
        >
          <Popup>
            <div className="p-1 min-w-[200px]">
              <h3 className="font-bold text-base">{restaurant.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < restaurant.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-xs ml-1">{restaurant.rating}/4</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {restaurant.address.street}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
