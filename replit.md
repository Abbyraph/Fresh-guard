# FreshGuard - Food Expiration Tracker

## Overview
FreshGuard is a progressive web app (PWA) that helps users track food items in their refrigerator or pantry. Users can scan barcodes or manually add items, and the system assigns expected shelf life. Items are displayed in a visual "fridge dashboard" with automated color-coded expiration indicators.

## Current Status (Task 1 Complete)
✅ Schema & Frontend Implementation
- Complete data models for food items with categories and shelf-life defaults
- Full React component suite with exceptional visual quality
- PWA manifest and mobile-first responsive design
- All user-facing components built and styled

## Project Architecture

### Data Model
- **Food Items**: name, category, purchase date, expiration date, barcode (optional)
- **Categories**: Produce (7 days), Dairy (7 days), Meat (3 days), Pantry (365 days), Frozen (180 days), Other (14 days)
- **Expiration Status**: Fresh (>72hrs), Soon (24-72hrs), Urgent (<24hrs), Expired

### Frontend Structure
- **Dashboard**: Main view with filterable/sortable item grid
- **Add Item Dialog**: Manual entry form with auto-calculated expiration dates
- **Edit Item Dialog**: Full CRUD editing capabilities
- **Barcode Scanner**: Camera-based scanning interface (demo mode enabled)
- **Filter Bar**: Category filtering and sorting (by expiration, name, category)
- **Food Item Cards**: Color-coded cards with left border status indicators

### Design System
- **Colors**: Warm, food-friendly palette with functional expiration status colors
  - Fresh: Green (rgb(34 197 94))
  - Soon: Yellow (rgb(234 179 8))
  - Urgent: Red (rgb(239 68 68))
  - Expired: Gray (rgb(156 163 175))
- **Typography**: Lora serif for headings, system fonts for body
- **Spacing**: Consistent 4-unit grid system
- **Components**: Shadcn UI with custom theming

### Key Features Implemented (Frontend)
1. ✅ Visual dashboard with color-coded expiration indicators
2. ✅ Manual item entry with category-based shelf-life calculation
3. ✅ Barcode scanner interface (camera access + demo mode)
4. ✅ Filter by category and sort by expiration/name/category
5. ✅ Edit and delete functionality
6. ✅ Empty states and loading states
7. ✅ Floating action buttons for quick access
8. ✅ PWA manifest for installability
9. ✅ Mobile-first responsive design
10. ✅ Touch-friendly 44px minimum touch targets

## Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js (pending implementation)
- **Database**: In-memory storage (pending implementation)
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Recent Changes
- 2024-11-21: Initial schema definition and complete frontend implementation
- Created all data models with shelf-life defaults
- Built comprehensive component library with Dashboard, dialogs, and cards
- Configured PWA manifest and mobile-optimized meta tags
- Implemented color-coded expiration status system per PRD requirements

## Next Steps
1. Implement backend API endpoints for CRUD operations
2. Set up in-memory storage with proper validation
3. Connect frontend to backend with error handling
4. Test all user flows and features
5. (Future) Add push notifications and email reminders
6. (Future) Integrate third-party barcode lookup API
7. (Future) Implement user authentication

## Development Guidelines
- Mobile-first approach with touch-friendly interactions
- Color-coded status indicators are functional requirements (per PRD)
- Auto-calculate expiration dates based on category defaults
- Support manual override of expiration dates
- Maintain clean, accessible UI with proper ARIA labels

## User Preferences
- None specified yet
