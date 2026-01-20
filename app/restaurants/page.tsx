import { Restaurant } from "@/types";
import { RestaurantsClient } from "@/components/restaurant-client";

async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(
    "https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json",
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  return res.json();
}

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants();

  return <RestaurantsClient initialRestaurants={restaurants} />;
}
