import { useMemo } from "react";
import { ClipboardList, FolderKanban, Users } from "lucide-react";
import BreakdownRow from "../components/BreakdownRow.jsx";
import Badge from "../components/ui/Badge.jsx";
import Avatar from "../components/ui/Avatar.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import { Skeleton } from "../components/ui/Skeleton.jsx";
import useLoading from "../lib/useLoading.js";
import { useTasks } from "../context/TasksContext.jsx";
import { projects, users, statusMeta, priorityMeta, projectStatusMeta } from "../data/mockData.js";
import { daysUntil, dueLabel } from "../lib/format.js";

function isOverdue(task) {
  return task.status !== "done" && daysUntil(task.dueDate) < 0;
}

export default function Reports() {
  const loading = useLoading(600);
  const { tasks } = useTasks();

  const statusBreakdown = useMemo(() => {
    const overdue = tasks.filter(isOverdue).length;
    return [
      { key: "todo", label: statusMeta.todo.label, count: tasks.filter((t) => t.status === "todo").length, color: "ink-faint" },
      { key: "in-progress", label: statusMeta["in-progress"].label, count: tasks.filter((t) => t.status === "in-progress").length, color: "blue" },
      { key: "done", label: statusMeta.done.label, count: tasks.filter((t) => t.status === "done").length, color: "accent" },
      { key: "overdue", label: "Overdue", count: overdue, color: "danger" },
    ];
  }, [tasks]);

  const priorityBreakdown = useMemo(() => {
    return Object.entries(priorityMeta).map(([key, meta]) => ({
      key,
      label: meta.label,
      count: tasks.filter((t) => t.priority === key).length,
      color: meta.color,
    }));
  }, [tasks]);

  const workload = useMemo(() => {
    return users
      .map((u) => ({
        user: u,
        count: tasks.filter((t) => t.assigneeId === u.id && t.status !== "done").length,
      }))
      .sort((a, b) => b.count - a.count);
  }, [tasks]);

  const maxWorkload = Math.max(1, ...workload.map((w) => w.count));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
          Reports
        </h2>
        <p className="mt-1 text-[13.5px] text-ink-muted">
          A snapshot of how work is distributed across your workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-line bg-surface p-5">
          <h3 className="flex items-center gap-2 font-display text-[15px] font-semibold text-ink">
            <ClipboardList size={16} className="text-ink-muted" />
            Tasks by status
          </h3>
          <div className="mt-4 flex flex-col gap-3.5">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)
              : statusBreakdown.map((row) => (
                  <BreakdownRow
                    key={row.key}
                    label={row.label}
                    count={row.count}
                    total={tasks.length}
                    color={row.color}
                  />
                ))}
          </div>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5">
          <h3 className="flex items-center gap-2 font-display text-[15px] font-semibold text-ink">
            <ClipboardList size={16} className="text-ink-muted" />
            Tasks by priority
          </h3>
          <div className="mt-4 flex flex-col gap-3.5">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)
              : priorityBreakdown.map((row) => (
                  <BreakdownRow
                    key={row.key}
                    label={row.label}
                    count={row.count}
                    total={tasks.length}
                    color={row.color === "ink-faint" ? "ink-faint" : row.color}
                  />
                ))}
          </div>
        </section>
      </div>

      <section>
        <h3 className="mb-3.5 flex items-center gap-2 font-display text-[15px] font-semibold text-ink">
          <FolderKanban size={16} className="text-ink-muted" />
          Project progress
        </h3>
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-line px-5 py-4 last:border-b-0">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-2 flex-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))
            : projects.map((p) => {
                const status = projectStatusMeta[p.status];
                const due = dueLabel(p.dueDate);
                const isDone = p.status === "completed";
                return (
                  <div
                    key={p.id}
                    className="flex flex-col gap-3 border-b border-line px-4 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
                  >
                    <div className="flex min-w-0 items-center gap-2.5 sm:w-56 sm:shrink-0">
                      <span className="rounded-md bg-canvas px-1.5 py-0.5 font-mono text-[10.5px] text-ink-muted">
                        {p.key}
                      </span>
                      <p className="truncate text-[13.5px] font-medium text-ink">{p.name}</p>
                    </div>
                    <div className="flex-1">
                      <ProgressBar value={p.progress} color={p.color} showLabel />
                    </div>
                    <div className="flex shrink-0 items-center gap-3 sm:w-48 sm:justify-end">
                      <Badge color={status.color} dot>
                        {status.label}
                      </Badge>
                      <span className={`text-xs font-medium ${due.urgent && !isDone ? "text-danger" : "text-ink-faint"}`}>
                        {isDone ? "Completed" : due.text}
                      </span>
                    </div>
                  </div>
                );
              })}
        </div>
      </section>

      <section>
        <h3 className="mb-3.5 flex items-center gap-2 font-display text-[15px] font-semibold text-ink">
          <Users size={16} className="text-ink-muted" />
          Team workload
        </h3>
        <div className="rounded-xl border border-line bg-surface p-5">
          <div className="flex flex-col gap-4">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-3.5 flex-1 max-w-[160px]" />
                  </div>
                ))
              : workload.map(({ user, count }) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar initials={user.initials} color={user.color} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-ink">{user.name}</p>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-canvas">
                        <div
                          className="h-full rounded-full bg-accent [transition-property:width,background-color] duration-500 ease-out"
                          style={{ width: `${(count / maxWorkload) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-20 shrink-0 text-right font-mono text-[12.5px] text-ink-faint">
                      {count} active
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
