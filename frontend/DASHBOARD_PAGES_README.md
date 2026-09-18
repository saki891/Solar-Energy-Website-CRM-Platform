# Admin Dashboard Pages (added)

Four new, self-contained page components were added under `src/pages/dashboard/`. They are **not wired into any router yet** — nothing in `App.jsx` was touched. Whoever adds routing (React Router, etc.) can drop these in directly:

```jsx
import Dashboard from "./pages/dashboard/Dashboard";
import Leads from "./pages/dashboard/Leads";
import Customers from "./pages/dashboard/Customers";
import SiteSurveys from "./pages/dashboard/SiteSurveys";

// e.g. with react-router-dom
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/leads" element={<Leads />} />
<Route path="/customers" element={<Customers />} />
<Route path="/site-surveys" element={<SiteSurveys />} />
```

Each page is fully self-contained — it renders its own sidebar + topbar (via `DashboardShell`), so you don't need to nest it in a layout to see it working. Just render the component on any route (or temporarily swap it into `main.jsx` to preview) and it displays a complete page.

## What's included

- `src/pages/dashboard/Dashboard.jsx` — stat cards, leads trend chart, leads-by-source donut, recent leads, quick actions, recent activity
- `src/pages/dashboard/Leads.jsx` — status tabs, filters, table, **working "Add New Lead" popup** (adds a row to the table, frontend-only)
- `src/pages/dashboard/Customers.jsx` — filters, table, **working "Add New Customer" popup**
- `src/pages/dashboard/SiteSurveys.jsx` — status tabs, filters, table, **working "Book New Survey" popup**
- `src/components/dashboard/*` — all the building blocks (Sidebar, Topbar, tables, badges, modal, form inputs, charts, etc.)
- `src/data/dashboardData.js` — sample data used by all four pages (swap for real API data later)
- `src/utils/dashboardDate.js` — small date-formatting helpers used by the "Add"/"Book" forms

## What was changed in existing files (non-destructive)

- **`tailwind.config.js`** — added a few new color tokens (`forest`, `leaf`, `ink`, `line`, `amber-accent`, `blue-accent`, `violet-accent`) used only by the dashboard components. Your existing `solara` color palette and everything else is untouched.
- **`package.json`** — added `recharts` as a dependency (used for the two charts on the Dashboard page). Run `npm install` after pulling this in.

Nothing else was touched — the landing page (`Header`, `HomePage`, `AboutPage`, `ServicesPage`, `BlogPage`, `ContactPage`) and `App.jsx` are exactly as they were.

## Notes on these pages

- Everything is frontend-only, sample data — no backend calls.
- "Add New Lead" / "Add New Customer" / "Book New Survey" buttons open a form popup; submitting adds a row to that page's table in React state (resets on refresh, since there's no backend/database yet).
- Search boxes and dropdown filters in the tables are visual only. The status **tabs** on Leads and Site Surveys do filter the table live.
- The sidebar's nav buttons and active highlight are controlled by plain props (`active`, `onNavigate`) — no router dependency — so whoever adds routing can wire `onNavigate` to their router's `navigate()` function, or ignore it and just use `<Route>` per page as shown above.
