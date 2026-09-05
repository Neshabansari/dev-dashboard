# DevTrack — Developer Productivity Dashboard

Task 1 of the Innovation Hacks Full Stack Development Internship: a responsive developer productivity dashboard built with React.

## Tech stack

- **React 19** + **Vite** — app shell and build tooling
- **React Router** — client-side routing (Dashboard / Projects / Tasks)
- **Tailwind CSS v4** — styling, using a custom design token theme (see `src/index.css`)
- **lucide-react** — icon set

## Features

- Dashboard home with live-computed stats, project highlights, an upcoming-tasks list, an overall completion ring, and a recent activity feed
- Projects page with search + status filtering over a responsive card grid
- Tasks page with status tabs, search, priority/project filters, and toggleable task completion
- Global command-style search in the top bar across projects and tasks
- Loading skeletons and empty states on every data view
- Fully responsive layout with a collapsible mobile navigation drawer
- Reusable component library: Button, Badge, Avatar, ProgressBar, ProgressRing, EmptyState, Skeleton

All data in `src/data/mockData.js` is shaped to mirror what the Task 2 REST API will eventually return, so it's a drop-in replacement once the backend is live.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    layout/       # Sidebar, Topbar, AppShell
    ui/            # Button, Badge, Avatar, ProgressBar, ProgressRing, EmptyState, Skeleton
    cards/         # StatCard, ProjectCard, TaskRow
    SearchFilterBar.jsx
  data/
    mockData.js    # Users, projects, tasks, activity feed
  lib/
    format.js      # Date/time formatting helpers
    useLoading.js  # Simulated async loading hook
  pages/
    Dashboard.jsx
    Projects.jsx
    Tasks.jsx
    NotFound.jsx
  App.jsx
  main.jsx
```
