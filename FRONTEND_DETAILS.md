# Frontend Project Details: GitDial (React)

## 1. Project Overview
**Tech Stack:**
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 3.4
- **Routing:** React Router DOM 7.13
- **Animations:** Framer Motion 12.29
- **Icons:** Lucide React
- **Charts:** Recharts

## 2. Architecture & Routing
The application uses a centered `App.jsx` for routing configuration, wrapped in `AnimatePresence` for page transitions.

### Route Groups
1.  **Public Routes** (Wrapped in `MainLayout`):
    - `/`: Landing Page
    - `/how-it-works`: How It Works
    - `/services`: Service Catalog
    - `/services/:id`: Service Details
    - `/contact`: Contact Us
    - `/about`: About Us

2.  **Auth Routes** (Standalone):
    - `/login`: Login Page
    - `/register`: Worker Registration
    - `/register/customer`: Customer Registration

3.  **Dashboard Routes** (Wrapped in `DashboardLayout`):
    - `/worker-dashboard/*`: For Service Providers
    - `/customer-dashboard/*`: For Clients/Customers
    - `/admin/*`: For System Admins

## 3. Dashboards & Panels

### A. Worker Dashboard (`/worker-dashboard`)
Accessible by Service Providers.
*Layout Role:* `worker`
- **Overview**: Main dashboard stats.
- **Job Requests** (`/leads`): View incoming leads.
- **My Services** (`/services`): Manage offered services.
- **My Bookings** (`/bookings`): View booked jobs.
- **Earnings** (`/earnings`): Financial overview.
- **Messages** (`/messages`): Chat with customers.
- **Settings** (`/settings`): Account settings.
- **Profile** (`/profile`): View/Edit profile.

### B. Customer Dashboard (`/customer-dashboard`)
Accessible by Clients.
*Layout Role:* `customer`
- **Dashboard**: Customer overview.
- **Browse Services** (`/services`): Find workers/services.
- **Service History** (`/history`): Past bookings.
- **My Subscriptions** (`/subscriptions`): Active plans.
- **Messages** (`/messages`): Chat with workers.
- **Favorites** (`/favorites`): Saved workers.
- **Wallet** (`/wallet`): Payments & Balance.
- **Saved Addresses** (`/addresses`): Manage locations.
- **Refer & Earn** (`/referral`): Referral program.
- **Loyalty Points** (`/loyalty`): Rewards.
- **Profile** (`/profile`): View/Edit profile.
- **Settings** (`/settings`): Account settings.

### C. Admin Panel (`/admin`)
Accessible by Administrators.
*Layout Role:* `admin`
- **Dashboard**: System overview.
- **Users** (`/users`): User management.
- **Service Approvals** (`/service-approvals`): Approve/Reject Gigs.
- **Portfolio Approvals** (`/portfolio-approvals`): Verify portfolios.
- **Disputes** (`/disputes`): Handle conflicts.
- **Moderation** (`/moderation`): Content moderation.
- **Settings** (`/settings`): Platform settings.

## 4. Key Components Structure

### Layouts
- **MainLayout**: Standard Header/Footer wrapper for public pages.
- **DashboardLayout**: Complex layout with a responsive Sidebar.
    - Dynamically renders sidebar links based on the `role` prop (`admin`, `worker`, `customer`).
    - Includes Header with Search, Notifications, and Profile menu.

### Pages Directory
- `src/pages/Admin`: Admin specific pages.
- `src/pages/Auth`: Authentication pages (Login/Register).
- `src/pages/Dashboard`: Wrapper pages for Dashboards (`WorkerDashboard`, `CustomerDashboard`).
- `src/pages/Profile`: User Profile components.
- `src/pages/Services`: Service catalog and details.
- `src/pages/LandingPage.jsx`, `Home.jsx`, `Contact.jsx`, etc.: Public pages.

### Components Directory
- `src/components/Dashboard`: Extensive collection of dashboard widgets (Charts, Tables, Lists).
    - *Examples:* `BookingTable`, `Earnings`, `Overview`, `Messages`, `ServiceHistory`.
- `src/components/LandingPage`: Components specific to the Landing Page.
    - *Examples:* `Hero`, `Navbar`, `Footer`, `Pricing`, `ServiceShowcase`.

## 5. Styling
- **Global Patterns**: Uses `index.css` with `@tailwind` directives.
- **Color Palette**: Defined via Tailwind classes (e.g., `primary`, `slate-500`, `bg-[#F8FAFC]`).
- **Icons**: Consistently uses `lucide-react` for UI icons.
