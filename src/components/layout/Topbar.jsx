import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown, LogOut, Settings, UserRound, FolderKanban, CheckSquare, Sun, Moon } from "lucide-react";
import Avatar from "../ui/Avatar.jsx";
import { currentUser, projects, tasks } from "../../data/mockData.js";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function Topbar({ onMenuClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchFocused(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return { projects: [], tasks: [] };
    const q = query.toLowerCase();
    return {
      projects: projects.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 3),
      tasks: tasks.filter((t) => t.title.toLowerCase().includes(q)).slice(0, 4),
    };
  }, [query]);

  const hasResults = results.projects.length > 0 || results.tasks.length > 0;

  function goToProjects() {
    setSearchFocused(false);
    setQuery("");
    navigate("/projects");
  }
  function goToTasks() {
    setSearchFocused(false);
    setQuery("");
    navigate("/tasks");
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-surface/90 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-md p-1.5 text-ink-muted hover:bg-canvas md:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="relative w-full max-w-md" ref={searchRef}>
        <Search
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          type="text"
          placeholder="Search projects and tasks…"
          className="h-9 w-full rounded-lg border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent-tint"
        />

        {searchFocused && query.trim() && (
          <div className="absolute left-0 right-0 top-11 overflow-hidden rounded-xl border border-line bg-surface shadow-elevated">
            {hasResults ? (
              <div className="max-h-80 overflow-y-auto scrollbar-thin py-1.5">
                {results.projects.length > 0 && (
                  <div className="px-1.5">
                    <p className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-ink-faint">
                      Projects
                    </p>
                    {results.projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={goToProjects}
                        className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-ink hover:bg-canvas"
                      >
                        <FolderKanban size={15} className="text-ink-muted" />
                        {p.name}
                      </button>
                    ))}
                  </div>
                )}
                {results.tasks.length > 0 && (
                  <div className="px-1.5 pt-1">
                    <p className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-ink-faint">
                      Tasks
                    </p>
                    {results.tasks.map((t) => (
                      <button
                        key={t.id}
                        onClick={goToTasks}
                        className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-ink hover:bg-canvas"
                      >
                        <CheckSquare size={15} className="text-ink-muted" />
                        <span className="truncate">{t.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="px-3.5 py-4 text-sm text-ink-muted">
                No matches for "{query}"
              </p>
            )}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-canvas hover:text-ink"
        >
          <Sun
            size={18}
            strokeWidth={1.9}
            className={`absolute transition-all duration-300 ${
              theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
            }`}
          />
          <Moon
            size={18}
            strokeWidth={1.9}
            className={`absolute transition-all duration-300 ${
              theme === "dark" ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
        </button>

        <div className="h-6 w-px bg-line" />

        <button
          className="relative rounded-md p-2 text-ink-muted hover:bg-canvas hover:text-ink"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.9} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger ring-2 ring-surface" />
        </button>

        <div className="h-6 w-px bg-line" />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-canvas"
          >
            <Avatar initials={currentUser.initials} color={currentUser.color} size="sm" />
            <span className="hidden text-sm font-medium text-ink sm:block">
              {currentUser.name.split(" ")[0]}
            </span>
            <ChevronDown size={14} className="hidden text-ink-faint sm:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 w-56 overflow-hidden rounded-xl border border-line bg-surface shadow-elevated">
              <div className="border-b border-line px-3.5 py-3">
                <p className="text-sm font-medium text-ink">{currentUser.name}</p>
                <p className="mt-0.5 truncate text-xs text-ink-muted">{currentUser.email}</p>
              </div>
              <div className="p-1.5">
                <button className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-ink hover:bg-canvas">
                  <UserRound size={15} className="text-ink-muted" />
                  Your profile
                </button>
                <button className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-ink hover:bg-canvas">
                  <Settings size={15} className="text-ink-muted" />
                  Settings
                </button>
              </div>
              <div className="border-t border-line p-1.5">
                <button className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-danger hover:bg-danger-tint">
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
