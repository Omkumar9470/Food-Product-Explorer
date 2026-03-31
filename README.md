# 🍎 Food Product Explorer

A modern web application to search, filter, and explore food products with detailed nutritional information, powered by the [OpenFoodFacts API](https://world.openfoodfacts.org/).

## 🚀 Live Demo

> https://food-product-explorer-psi.vercel.app/

## 📸 Screenshots

> 

## ✨ Features

- **Product Listing** — Browse a large catalog of real food products with images, categories, and nutrition grades
- **Search by Name** — Instantly search food products by name with debounced input
- **Search by Barcode** — Look up any specific product using its barcode number
- **Category Filter** — Filter products by category (Beverages, Dairy, Snacks, Cereals, etc.)
- **Sort Functionality** — Sort products by name (A-Z, Z-A) or nutrition grade (best/worst first)
- **Load More** — Paginated product loading with a smooth Load More button
- **Product Detail Page** — Full product details including ingredients, nutritional values table, and labels
- **Cart System** — Add products to cart with real-time item count and slide-in drawer
- **Toast Notifications** — Instant feedback when adding products to cart
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop
- **Dark Mode** — Full dark mode support

## 🛠️ Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org/) (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **UI Components** — shadcn/ui
- **API** — [OpenFoodFacts API](https://world.openfoodfacts.org/)
- **State Management** — React Context API (Cart)
- **Toast Notifications** — Sonner

## 📁 Project Structure
```
├── app/
│   ├── api/
│   │   ├── categories/route.ts       # Proxy route for categories
│   │   ├── products/route.ts         # Proxy route for product search
│   │   ├── category/[name]/route.ts  # Proxy route for category filter
│   │   └── product/[barcode]/route.ts # Proxy route for product detail
│   ├── product/[id]/page.tsx         # Product detail page
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Homepage
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── navbar.tsx                    # Navigation bar
│   ├── product-card.tsx              # Product card component
│   ├── product-grid.tsx              # Product grid with skeleton loading
│   ├── search-bar.tsx                # Name and barcode search
│   ├── filter-bar.tsx                # Category and sort filters
│   ├── cart-drawer.tsx               # Slide-in cart drawer
│   └── nutrition-table.tsx           # Nutritional values table
├── lib/
│   ├── api.ts                        # OpenFoodFacts API functions
│   └── cart-context.tsx              # Cart state management
└── types/
    └── index.ts                      # TypeScript interfaces
```

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Omkumar9470/Food-Product-Explorer
cd your-repo-name
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔌 API Integration

This project uses the [OpenFoodFacts API](https://world.openfoodfacts.org/) — a free, open-source food database maintained by a non-profit organization.

Since the API doesn't support CORS for browser requests, all API calls are routed through **Next.js API Routes** which act as a server-side proxy.

Key endpoints used:
- `GET /cgi/search.pl` — Search products by name
- `GET /category/{name}.json` — Get products by category
- `GET /api/v0/product/{barcode}.json` — Get product by barcode
- `GET /categories.json` — Get all categories

## ⏱️ Time Taken

> Approximately 10 hours

## 📄 License

This project is for evaluation purposes only.