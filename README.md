
# 🥗 FreshGuard - Food Expiration Tracker

A modern Progressive Web App (PWA) that helps you track food items and reduce waste through smart expiration monitoring.


![License](https://img.shields.io/badge/License-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)

## ✨ Features

- **📊 Visual Dashboard**: Color-coded expiration indicators (Green > 72hrs, Yellow 24-72hrs, Red < 24hrs)
- **➕ Manual Entry**: Quick item addition with auto-calculated expiration dates based on category
- **📷 Barcode Scanner**: Built-in camera-based scanning using html5-qrcode
- **🔍 Smart Filtering**: Filter by 6 food categories (Produce, Dairy, Meat, Pantry, Frozen, Other)
- **🔄 Flexible Sorting**: Sort by expiration date, name, or category
- **✏️ Full CRUD**: Create, read, update, and delete items with ease
- **📱 PWA Support**: Install on mobile devices and work offline
- **🎨 Beautiful UI**: Modern design with Shadcn UI components and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm

### Installation

1. Clone or fork this Repo
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://0.0.0.0:5000`

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **TanStack Query v5** - Data fetching and caching
- **React Hook Form + Zod** - Form validation
- **html5-qrcode** - Barcode scanning
- **date-fns** - Date handling
- **Lucide React** - Icons

### Backend
- **Express.js** - Server framework
- **Node.js** - Runtime
- **In-Memory Storage** - Data persistence (upgradable to PostgreSQL)

### Build Tools
- **Vite** - Build tool and dev server
- **esbuild** - Production bundling

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and query client
│   └── public/            # Static assets and PWA files
├── server/                # Backend Express application
│   ├── app.ts            # Express app setup
│   ├── routes.ts         # API route handlers
│   └── storage.ts        # In-memory data storage
└── shared/               # Shared types and schemas
    └── schema.ts         # Zod validation schemas
```

## 🎯 Category Shelf-Life Defaults

FreshGuard automatically calculates expiration dates based on these defaults:

- **Produce**: 7 days
- **Dairy**: 7 days
- **Meat**: 3 days
- **Pantry**: 365 days
- **Frozen**: 180 days
- **Other**: 14 days

You can override these dates when adding or editing items.

## 🔌 API Endpoints

- `GET /api/items` - Fetch all food items
- `GET /api/items/:id` - Fetch single item
- `POST /api/items` - Create new item
- `PATCH /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Production Build

To build for production locally:

```bash
npm run build
npm run start
```

## 📱 PWA Installation

Users can install FreshGuard on their devices:

1. Open the app in a mobile browser
2. Tap "Add to Home Screen" (iOS) or follow the install prompt (Android)
3. The app works offline with cached data

## 🎨 Design System

- **Color Palette**: Warm, food-friendly colors
- **Typography**: Lora (serif headings), Geist Sans (body), Space Grotesk (mono)
- **Spacing**: Consistent 4-unit grid system
- **Components**: Shadcn UI with custom theming
- **Responsive**: Mobile-first design with 44px minimum touch targets


## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

