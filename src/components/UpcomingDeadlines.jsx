import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, CheckSquare, FolderKanban, ArrowUpRight } from "lucide-react";
import EmptyState from "./ui/EmptyState.jsx";
import { Skeleton } from "./ui/Skeleton.jsx";
import { useTasks } from "../context/TasksContext.jsx";
import { projects, getProject } from "../data/mockData.js";
import { dueLabel } from "../lib/format.js";

export default function UpcomingDeadlines({ loading, limit = 5 }) {
  const { tasks } = useTasks();

  const deadlines = useMemo(() => {
    const taskItems = tasks
      .filter((t) => t.status !== "done")
      .map((t) => {
        const project = getProject(t.projectId);
        return {
          id: `task-${t.id}`,
          kind: "task",
          title: t.title,
          subtitle: project?.name ?? "",
          dueDate: t.dueDate,
          color: project?.color ?? "accent",
        };
      });

    const projectItems = projects
      .filter((p) => p.status !== "completed")
      .map((p) => ({
        id: `project-${p.id}`,
        kind: "project",
        title: p.name,
        subtitle: `${p.key} · Project deadline`,
        dueDate: p.dueDate,
        color: p.color,
      }));

    return [...taskItems, ...projectItems]
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, limit);
  }, [tasks, limit]);

  return (
    <section className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-display text-[15px] font-semibold text-ink">
          <span aria-hidden="true">📅</span> Upcoming Deadlines
        </h3>
        <Link
          to="/tasks"
          className="flex items-center gap-1 text-[12.5px] font-medium text-accent-hover hover:underline"
        >
          View all
          <ArrowUpRight size={13} />
        </Link>
      </div>

      <ul className="mt-3.5 flex flex-col">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="flex items-center gap-3 border-t border-line py-3 first:border-t-0">
              <Skeleton className="h-7 w-7 shrink-0 rounded-md" />
              <div className="flex-1">
                <Skeleton className="h-3 w-full max-w-[160px]" />
                <Skeleton className="mt-2 h-2.5 w-20" />
              </div>
            </li>
          ))
        ) : deadlines.length === 0 ? (
          <div className="py-2">
            <EmptyState
              icon={CalendarClock}
              title="No upcoming deadlines"
              description="Task and project due dates will show up here as they're scheduled."
            />
          </div>
        ) : (
          deadlines.map((item) => {
            const due = dueLabel(item.dueDate);
            const Icon = item.kind === "task" ? CheckSquare : FolderKanban;
            return (
              <li
                key={item.id}
                className="flex items-center gap-3 border-t border-line py-3 first:border-t-0"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                  style={{
                    backgroundColor: `var(--color-${item.color}-tint)`,
                    color: `var(--color-${item.color})`,
                  }}
                >
                  <Icon size={14} strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink">{item.title}</p>
                  <p className="mt-0.5 truncate text-[11.5px] text-ink-muted">{item.subtitle}</p>
                </div>
                <span
                  className={`shrink-0 text-[11.5px] font-medium ${
                    due.urgent ? "text-danger" : "text-ink-faint"
                  }`}
                >
                  {due.text}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
