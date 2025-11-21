# FreshGuard - Food Expiration Tracker

## Overview
FreshGuard is a progressive web app (PWA) that helps users track food items in their refrigerator or pantry. Users can scan barcodes or manually add items, and the system assigns expected shelf life based on category. Items are displayed in a visual "fridge dashboard" with automated color-coded expiration indicators to reduce food waste.

## Status: ✅ MVP Complete
All core features from the Product Requirements Document have been implemented and tested successfully.

## Project Architecture

### Data Model
- **Food Items**: name, category, purchase date, expiration date, barcode (optional), image URL (optional)
- **Categories with Shelf-Life Defaults**:
  - Produce: 7 days
  - Dairy: 7 days
  - Meat: 3 days
  - Pantry: 365 days
  - Frozen: 180 days
  - Other: 14 days
- **Expiration Status** (color-coded):
  - Fresh (>72hrs): Green
  - Soon (24-72hrs): Yellow
  - Urgent (<24hrs): Red
  - Expired: Gray

### Frontend Structure
- **Dashboard**: Main view with filterable/sortable item grid, color-coded expiration indicators
- **Add Item Dialog**: Manual entry form with auto-calculated expiration dates based on category
- **Edit Item Dialog**: Full CRUD editing capabilities with form validation
- **Barcode Scanner**: Camera-based scanning using html5-qrcode library with demo fallback
- **Filter Bar**: Category filtering and sorting (by expiration, name, category)
- **Food Item Cards**: Cards with 4px left border color-coded by expiration status
- **Empty States**: Beautiful onboarding experience for new users
- **Loading States**: Skeleton loaders for data fetching

### Design System
- **Colors**: Warm, food-friendly palette with functional expiration status colors
  - Fresh: Green (rgb(34 197 94))
  - Soon: Yellow (rgb(234 179 8))
  - Urgent: Red (rgb(239 68 68))
  - Expired: Gray (rgb(156 163 175))
- **Typography**: Lora serif for headings, Geist sans-serif for body, Space Grotesk for mono
- **Spacing**: Consistent 4-unit grid system (2, 4, 8, 12, 16)
- **Components**: Shadcn UI with custom theming and elevation system
- **Responsive**: Mobile-first design with 44px minimum touch targets

### Implemented Features (Complete MVP)
1. ✅ Visual dashboard with color-coded expiration indicators per PRD
2. ✅ Manual item entry with category-based shelf-life auto-calculation
3. ✅ Barcode scanner with html5-qrcode (live camera scanning + demo mode)
4. ✅ Filter by category (6 categories)
5. ✅ Sort by expiration, name, or category
6. ✅ Full CRUD operations (Create, Read, Update, Delete)
7. ✅ Edit functionality with pre-filled forms
8. ✅ Delete with confirmation dialog
9. ✅ Empty states and loading states
10. ✅ Floating action buttons (+ for add, camera for scan)
11. ✅ PWA manifest for installability
12. ✅ Service worker for offline caching
13. ✅ Mobile-first responsive design
14. ✅ Toast notifications for user feedback
15. ✅ Form validation with Zod schemas
16. ✅ Optimistic UI updates with React Query
17. ✅ Time-remaining calculations (days/hours)
18. ✅ Automatic cache invalidation after mutations

## Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **Storage**: In-memory (MemStorage with full CRUD interface)
- **State Management**: TanStack Query v5
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Barcode Scanning**: html5-qrcode
- **PWA**: Service Worker with offline caching

## API Endpoints
- `GET /api/items` - Fetch all food items
- `GET /api/items/:id` - Fetch single item
- `POST /api/items` - Create new item (validates with Zod)
- `PATCH /api/items/:id` - Update item (partial updates)
- `DELETE /api/items/:id` - Delete item

All endpoints include proper error handling and validation.

## Recent Changes
- 2024-11-21: Complete MVP implementation
  - Created all data models with shelf-life defaults
  - Built comprehensive component library
  - Implemented full backend API with validation
  - Fixed date serialization (ISO strings)
  - Integrated html5-qrcode for barcode scanning
  - Added PWA service worker and offline support
  - Passed all end-to-end tests successfully
  - Architect approval received

## Testing Results
All user flows tested and verified:
- ✅ Add items manually with auto-calculated expiration
- ✅ Edit items (name, category, dates)
- ✅ Delete items with confirmation
- ✅ Filter by category
- ✅ Sort by name, expiration, category
- ✅ Barcode scanner (demo mode)
- ✅ Empty state experience
- ✅ API integration (GET, POST, PATCH, DELETE)
- ✅ Cache invalidation and optimistic updates
- ✅ Toast notifications

## Future Enhancements (Beyond MVP)
1. Push notifications for expiration reminders
2. Email alerts (daily/weekly digests)
3. Third-party barcode lookup API integration (UPCItemDB)
4. User authentication (email/password + Google OAuth)
5. Image upload for items
6. Advanced offline sync with background jobs
7. Scheduled reminder system (APScheduler/cron)
8. Export data functionality
9. Settings page for notification preferences
10. Database persistence (PostgreSQL migration)

## Development Guidelines
- Mobile-first approach with touch-friendly interactions
- Color-coded status indicators are functional requirements (per PRD)
- Auto-calculate expiration dates based on category defaults
- Support manual override of expiration dates
- Maintain clean, accessible UI with proper ARIA labels
- Follow universal design guidelines for spacing, contrast, and component usage
- Use Shadcn components with hover-elevate/active-elevate-2 utilities
- Never nest Date objects - always serialize to ISO strings for API calls

## User Preferences
- None specified yet

## Running the Application
The workflow "Start application" runs `npm run dev` which starts:
- Express server on port 5000 (backend)
- Vite dev server (frontend)

Both are served on the same port with Vite handling the proxy.

## PWA Installation
Users can install FreshGuard as a PWA on their mobile devices:
1. Open the app in a mobile browser
2. Tap "Add to Home Screen" (iOS) or install prompt (Android)
3. The app will work offline with cached data
