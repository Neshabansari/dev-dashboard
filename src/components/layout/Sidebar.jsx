import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  Settings,
  X,
  Zap,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Avatar from "../ui/Avatar.jsx";
import { currentUser } from "../../data/mockData.js";

const primaryNav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
];

const secondaryNav = [
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavItem({ to, label, icon: Icon, end, onNavigate, collapsed }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
          collapsed ? "md:justify-center md:px-2.5" : ""
        } ${
          isActive
            ? "bg-navy-hover text-navy-ink"
            : "text-navy-ink-muted hover:bg-navy-raised hover:text-navy-ink"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={17}
            strokeWidth={2}
            className={`shrink-0 ${isActive ? "text-accent" : "text-navy-ink-muted group-hover:text-navy-ink"}`}
          />
          <span className={collapsed ? "md:hidden" : ""}>{label}</span>
          {collapsed && (
            <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-tooltip px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-elevated transition-opacity duration-150 group-hover:opacity-100 md:block">
              {label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ open, onClose, collapsed, onToggleCollapsed }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-navy px-3 py-4 [transition-property:transform,background-color,border-color,color] duration-200 ease-out md:sticky md:top-0 md:h-screen md:translate-x-0 md:[transition-property:width,background-color,border-color,color] md:duration-300 md:ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "md:w-[76px]" : "md:w-64"}`}
      >
        <div className={`flex items-center py-2 ${collapsed ? "md:justify-center md:px-0" : "justify-between px-2"}`}>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-solid text-white">
              <Zap size={15} strokeWidth={2.5} fill="currentColor" />
            </span>
            <span className={`font-display text-[15px] font-semibold tracking-tight text-navy-ink ${collapsed ? "md:hidden" : ""}`}>
              Pulse
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-navy-ink-muted hover:bg-navy-raised hover:text-navy-ink md:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleCollapsed}
          className={`mt-1 hidden items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-navy-ink-muted transition-colors duration-150 hover:bg-navy-raised hover:text-navy-ink md:flex ${
            collapsed ? "md:justify-center md:px-2.5" : ""
          }`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={17} strokeWidth={2} /> : <PanelLeftClose size={17} strokeWidth={2} />}
          <span className={collapsed ? "md:hidden" : ""}>Collapse</span>
        </button>

        <nav className="mt-4 flex flex-col gap-0.5 px-1">
          <p className={`mb-1.5 px-2 text-[11px] font-medium uppercase tracking-wide text-navy-ink-muted/70 ${collapsed ? "md:hidden" : ""}`}>
            Workspace
          </p>
          {primaryNav.map((item) => (
            <NavItem key={item.label} {...item} onNavigate={onClose} collapsed={collapsed} />
          ))}
        </nav>

        <nav className="mt-6 flex flex-col gap-0.5 px-1">
          <p className={`mb-1.5 px-2 text-[11px] font-medium uppercase tracking-wide text-navy-ink-muted/70 ${collapsed ? "md:hidden" : ""}`}>
            More
          </p>
          {secondaryNav.map((item) => (
            <NavItem key={item.label} {...item} onNavigate={onClose} collapsed={collapsed} />
          ))}
        </nav>

        <div
          className={`group relative mt-auto flex items-center gap-2.5 rounded-lg border border-navy-line bg-navy-raised px-2.5 py-2.5 ${
            collapsed ? "md:justify-center md:px-0" : ""
          }`}
        >
          <Avatar initials={currentUser.initials} color={currentUser.color} size="md" />
          <div className={`min-w-0 ${collapsed ? "md:hidden" : ""}`}>
            <p className="truncate text-[13px] font-medium text-navy-ink">{currentUser.name}</p>
            <p className="truncate text-[11.5px] text-navy-ink-muted">{currentUser.role}</p>
          </div>
          {collapsed && (
            <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-tooltip px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-elevated transition-opacity duration-150 group-hover:opacity-100 md:block">
              {currentUser.name}
            </span>
          )}
        </div>
      </aside>
    </>
  );
}
