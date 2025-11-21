# FreshGuard Design Guidelines

## Design Approach
**Material Design System** (adapted for Bootstrap) - Selected for content-rich, utility-focused food tracking application requiring strong visual feedback and mobile-first PWA functionality.

## Core Design Principles
1. **Mobile-First Priority**: Every interface optimized for single-handed phone usage
2. **Scan-to-Action Speed**: Minimize taps between scanning and saving items
3. **Status-at-a-Glance**: Instant recognition of item freshness through visual hierarchy
4. **Touch-Friendly**: All interactive elements minimum 44px touch targets

---

## Typography System

**Font Stack**: System fonts via Bootstrap defaults (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)

**Hierarchy**:
- Page Titles: Bold, 24px (1.5rem)
- Card Headers/Item Names: Semibold, 18px (1.125rem)
- Body/Dates: Regular, 16px (1rem)
- Labels/Meta: Medium, 14px (0.875rem)
- Small Text/Timestamps: Regular, 12px (0.75rem)

---

## Layout System

**Spacing Units**: Tailwind scale - primarily use **2, 4, 8, 12, 16** units
- Micro spacing (within cards): p-2, gap-2
- Component padding: p-4, p-6
- Section spacing: py-8, py-12
- Between major sections: my-16

**Container Strategy**:
- Max-width: 1200px for dashboard grid
- Mobile: Full-width with px-4 padding
- Card grids: 1 column mobile, 2-3 columns tablet+

---

## Component Library

### Navigation
- **Fixed Bottom Navigation** (mobile): 4 icons - Dashboard, Scan, Add, Settings
- Icon size: 24px, labels below 10px
- Active state: distinct visual indicator

### Dashboard Cards
- **Card Structure**: Elevated cards with subtle shadow
- Rounded corners: 12px radius
- Padding: p-4
- **Visual Status Indicators**: Left border (4px width) using PRD-specified functional colors
- Card grid: gap-4 between cards
- Sort order: Expiration urgency first

### Item Card Content Layout
```
[Category Icon] Product Name
Purchase Date | Days Remaining
Expiration: [Date]
[Edit] [Delete] actions
```

### Floating Action Buttons
- **Primary Scan Button**: Large circular FAB, bottom-right, 64px diameter
- **Secondary Add Button**: Smaller FAB, stacked above primary
- Elevation: prominent shadow for depth

### Camera/Scanning Interface
- **Full-screen overlay** when active
- Scanning guide: centered rectangle outline
- Cancel button: top-left
- Flash toggle: top-right
- Instructions: bottom overlay text

### Forms (Manual Entry)
- **Single-column layout** with clear field grouping
- Floating labels for text inputs
- Large touch-friendly select dropdowns
- Date pickers: native HTML5 date input
- Auto-focus on name field
- Prominent save button at bottom

### Item Detail View
- **Hero-style header** with large product name
- Key info in stat cards (3-column grid on tablet+)
- Action buttons: full-width mobile, inline tablet+

### Settings Screen
- **Grouped sections** with dividers
- Toggle switches for notifications
- Radio buttons for reminder frequency
- Clear section headers

### Empty States
- **Centered illustration placeholder** (use icon + text)
- Large "Get Started" CTA
- Brief onboarding message

---

## Animations

**Minimal, Purposeful Only**:
- Card entry: subtle fade-in (200ms)
- Delete action: slide-out animation (300ms)
- Scan success: quick scale pulse
- NO scroll animations, NO parallax

---

## Icons

**Heroicons** (via CDN) for:
- Navigation icons (home, camera, plus, cog)
- Category icons (apple/produce, milk/dairy, meat, box/pantry, snowflake/frozen)
- Action icons (pencil, trash, bell)
- Status icons (check, alert, x)

Consistent sizing: 20px for inline, 24px for navigation, 32px for empty states

---

## Images

**Product placeholder images**: Use subtle gradient backgrounds with large category icon when no image available

**No hero image section** - This is a utility dashboard app, not a marketing page. Dashboard is the primary view.

---

## Functional Color Indicators (Per PRD)

Status borders/badges for expiration urgency:
- **Fresh** (>72hrs): Green indicator
- **Soon** (24-72hrs): Yellow indicator  
- **Urgent** (<24hrs): Red indicator
- **Expired**: Gray indicator

These are functional requirements, not aesthetic choices.

---

## Key User Flows Layout

**Dashboard → Scan Flow**:
1. Tap FAB → Full-screen camera
2. Scan success → Overlay confirmation with product preview
3. Bottom sheet: Category/date adjustment
4. Save → Return to dashboard with new card

**Dashboard → Manual Add**:
1. Tap secondary FAB → Slide-up form
2. Single screen: all fields visible
3. Save → Immediate dashboard return

**Item Management**:
1. Tap card → Full item detail
2. Swipe card left → Quick delete (with undo toast)
3. Edit from detail view → Inline editing

---

## Accessibility
- High contrast text on all backgrounds
- Clear focus indicators on all interactive elements
- ARIA labels for icon-only buttons
- Minimum 16px font size for body text
- Touch targets: 44px minimum

---

## Quality Standards
- **Zero loading spinners** for cached data
- **Optimistic UI**: Show changes immediately, sync in background
- **Offline grace**: Clear messaging when offline, queue actions
- **Fast interactions**: All taps respond within 100ms