export interface Location {
  lat: number;
  lng: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  location: Location;
}

export interface Contact {
  site: string;
  email: string;
  phone: string;
}

export interface Restaurant {
  id: string;
  name: string;
  contact: Contact;
  address: Address;
  rating: number;
}

export type SortOption = "rating" | "alphabetical-asc" | "alphabetical-desc";

export interface RadiusSearchParams {
  lat: number;
  lng: number;
  radius: number;
}

export interface RadiusSearchResult {
  count: number;
  averageRating: number;
  standardDeviation: number;
  restaurants: Restaurant[];
}
