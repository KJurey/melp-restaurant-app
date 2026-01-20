# 🍽️ Melp - Restaurant Discovery Platform

A modern, responsive restaurant discovery application built with Next.js 14, TypeScript, and Tailwind CSS. Browse restaurants, view them on an interactive map, filter by location and rating, and share your favorites! (Assessment for EDT screening)

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### 📱 Dual View Modes

- **List View**: Grid layout with detailed restaurant cards
- **Map View**: Interactive Leaflet map with location-based filtering

### 🔍 Advanced Filtering

- **Location-based filtering**: Search within a radius from any coordinates
- **Rating filter**: Filter restaurants by rating range (0-5 stars)
- **Sorting options**:
  - By rating (highest first)
  - Alphabetically (A-Z)
  - Alphabetically (Z-A)

### 🎨 Modern UI/UX

- **Responsive design**: Works seamlessly on mobile, tablet, and desktop
- **Dark mode ready**: Built with shadcn/ui components
- **Smooth animations**: Hover effects and transitions
- **Interactive cards**: Like restaurants and track engagement

### 🗺️ Map Features

- **Search radius visualization**: Visual circle showing search area
- **Dynamic filtering**: Real-time updates as you adjust filters
- **Geolocation support**: Find restaurants near you

### 🎯 Additional Features

- **Like system**: Track your favorite restaurants
- **Contact integration**: Direct links for phone, email, and website
- **Image placeholders**: Dynamic restaurant images
- **Statistics**: Real-time filtering statistics

## 🚀 Tech Stack

### Core

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)

### Libraries

- **Maps**: [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Geospatial**: Custom Haversine distance calculation
- **Fonts**: [Geist](https://vercel.com/font)

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/KJurey/melp-restaurant-app.git
cd melp-restaurant-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**

```
http://localhost:3000
```

## 🏗️ Project Structure

```
melp-restaurant-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── restaurants/         # Restaurant pages
│   │       ├── page.tsx         # Server component (data fetching)
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── slider.tsx
│   │   │   └── ...
│   │   ├── features/            # Feature components
│   │   │   ├── map/             # Map-related components
│   │   │   │   ├── map-view.tsx
│   │   │   │   ├── map-filters.tsx
│   │   │   │   ├── map-search.tsx
│   │   │   │   ├── map-controls.tsx
│   │   │   │   └── recommendation-card.tsx
│   │   │   └── restaurant/      # Restaurant components
│   │   │       ├── restaurant-card.tsx
│   │   │       ├── restaurant-grid.tsx
│   │   │       └── restaurant-list.tsx
│   │   ├── filter-bar.tsx       # Main filter controls
│   │   ├── restaurant-client.tsx # Client-side logic
│   │   ├── footer.tsx
│   │   ├── view-toggle.tsx
│   │   └── sort-controls.tsx
│   ├── hooks/                   # Custom React hooks
│   │   └── useRestaurantFilter.ts
│   ├── lib/                     # Utilities
│   │   ├── utils.ts             # Helper functions
│   ├── utils/                     # Utilities
│   │   ├── get-restaurants.ts         # Data fetching
│   │   ├── get-distance.ts      # Distance calculations
│   │   └── standard-deviation.ts      # Distance calculations
│   ├── types/                   # TypeScript definitions
│   │   └── index.ts
├── public/                      # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deployment
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## 🎯 Key Components

### Server Components

- **`app/restaurants/page.tsx`**: Fetches restaurant data at build time
- **Static Generation**: Pre-renders all data for optimal performance

### Client Components

- **`restaurant-client.tsx`**: Manages state and user interactions
- **`restaurant-card.tsx`**: Individual restaurant display
- **`map-view.tsx`**: Interactive Leaflet map
- **`filter-bar.tsx`**: Filter controls and view toggle

### Custom Hooks

- **`useRestaurantFilter`**: Handles location and rating filtering logic

## 🔧 Configuration

### Next.js Config

```typescript
// next.config.ts
const nextConfig = {
  output: "export", // Static export for GitHub Pages
  trailingSlash: true, // Required for GitHub Pages
  basePath: "/repo-name", // If deploying to username.github.io/repo-name
  images: {
    unoptimized: true, // Required for static export
  },
};
```

## 🚢 Deployment

### GitHub Pages (Recommended)

1. **Update `next.config.ts`**

```typescript
basePath: "/your-repo-name", // Only if NOT using username.github.io
```

2. **Enable GitHub Pages**
   - Go to Repository Settings → Pages
   - Source: Select "GitHub Actions"

3. **Push to GitHub**

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

4. **Automatic Deployment**
   - The GitHub Action will automatically build and deploy
   - Your site will be live at `https://username.github.io/repo-name`

### Other Platforms

#### Vercel

```bash
npm install -g vercel
vercel
```

#### Netlify

```bash
npm run build
# Upload the 'out' folder to Netlify
```

## 📊 Data Structure

### Restaurant Type

```typescript
interface Restaurant {
  id: string;
  rating: number;
  name: string;
  site: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}
```

### API Response

```json
[
  {
    "id": "851f799f-0852-439e-b9b2-df50de84f1d2",
    "rating": 1,
    "name": "Barajas, Rincón and Granados",
    "site": "https://federico.com",
    "email": "Anabel.Ortega@yahoo.com",
    "phone": "534 814 204",
    "street": "82247 Miguel Entrada",
    "city": "Mérida Alfredotown",
    "state": "Durango",
    "lat": 19.440134,
    "lng": -99.127809
  }
]
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#2563eb', // Blue
        foreground: '#ffffff',
      },
      // Add custom colors
    },
  },
}
```

### Map Settings

Edit `components/features/map/map-view.tsx`:

```typescript
// Default center coordinates
const DEFAULT_CENTER: [number, number] = [19.4326, -99.1332];

// Map tile provider
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
```

## 🧪 Testing

### Run Tests

```bash
npm run test
# or
yarn test
```

### Type Checking

```bash
npm run type-check
# or
yarn type-check
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Restaurant data from [Melp Dataset](https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Map tiles from [OpenStreetMap](https://www.openstreetmap.org/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

Kevin Juarez - kevinjuarez98@gmail.com

Project Link: [https://github.com/KJurey/melp-restaurant-app](https://github.com/Kjurey/melp-restaurant-app)

---

**Built with ❤️ using Next.js and TypeScript**
