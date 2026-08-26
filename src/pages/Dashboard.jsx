import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FolderKanban, Loader2, CheckCircle2, AlertTriangle, ArrowUpRight, Plus } from "lucide-react";
import StatCard from "../components/cards/StatCard.jsx";
import ProjectCard from "../components/cards/ProjectCard.jsx";
import Avatar from "../components/ui/Avatar.jsx";
import Button from "../components/ui/Button.jsx";
import ProgressRing from "../components/ui/ProgressRing.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import NewTaskModal from "../components/NewTaskModal.jsx";
import UpcomingDeadlines from "../components/UpcomingDeadlines.jsx";
import { StatCardSkeleton, ProjectCardSkeleton, Skeleton } from "../components/ui/Skeleton.jsx";
import useLoading from "../lib/useLoading.js";
import { useTasks } from "../context/TasksContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { projects, activity, getUser, currentUser } from "../data/mockData.js";
import { daysUntil, relativeTime } from "../lib/format.js";

export default function Dashboard() {
  const loading = useLoading(650);
  const { tasks, addTask } = useTasks();
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const activeProjects = projects.filter((p) => p.status === "active").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const completed = tasks.filter((t) => t.status === "done").length;
    const overdue = tasks.filter((t) => t.status !== "done" && daysUntil(t.dueDate) < 0).length;
    return { activeProjects, inProgress, completed, overdue };
  }, [tasks]);

  const completionRate = Math.round((stats.completed / tasks.length) * 100);

  const featuredProjects = useMemo(
    () => projects.filter((p) => p.status !== "completed").slice(0, 4),
    []
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-medium text-ink-muted">Tuesday, September 1</p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
            Good morning, {currentUser.name.split(" ")[0]}
          </h2>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>
          New task
        </Button>
      </div>

      {/* Stat cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard
              label="Active projects"
              value={stats.activeProjects}
              icon={FolderKanban}
              color="accent"
              onClick={() => navigate("/projects?status=active")}
            />
            <StatCard
              label="In progress"
              value={stats.inProgress}
              icon={Loader2}
              color="blue"
              onClick={() => navigate("/tasks?status=in-progress")}
            />
            <StatCard
              label="Completed"
              value={stats.completed}
              icon={CheckCircle2}
              color="violet"
              onClick={() => navigate("/tasks?status=done")}
            />
            <StatCard
              label="Overdue"
              value={stats.overdue}
              icon={AlertTriangle}
              color="amber"
              trend={stats.overdue > 0 ? { value: stats.overdue, label: "need attention", positive: false } : null}
              onClick={() => navigate("/tasks?overdue=true")}
            />
          </>
        )}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          <section>
            <div className="mb-3.5 flex items-center justify-between">
              <h3 className="font-display text-[15px] font-semibold text-ink">Your projects</h3>
              <Link
                to="/projects"
                className="flex items-center gap-1 text-[13px] font-medium text-accent-hover hover:underline"
              >
                View all
                <ArrowUpRight size={14} />
              </Link>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
              </div>
            ) : featuredProjects.length === 0 ? (
              <EmptyState
                icon={FolderKanban}
                title="No active projects"
                description="Projects you create will show up here once they're underway."
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {featuredProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Side column */}
        <div className="flex flex-col gap-6">
          <UpcomingDeadlines loading={loading} limit={5} />

          <section className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-display text-[15px] font-semibold text-ink">Overall completion</h3>
            <div className="mt-4 flex items-center gap-4">
              {loading ? (
                <Skeleton className="h-14 w-14 rounded-full" />
              ) : (
                <ProgressRing value={completionRate} size={56} color="accent" />
              )}
              <div>
                <p className="text-[13px] text-ink-muted">
                  {loading ? <Skeleton className="h-3.5 w-24" /> : `${stats.completed} of ${tasks.length} tasks done`}
                </p>
                <p className="mt-1 text-[12px] text-ink-faint">Across all workspaces</p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-display text-[15px] font-semibold text-ink">Recent activity</h3>
            <ul className="mt-4 flex flex-col gap-4">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="flex gap-3">
                      <Skeleton className="h-7 w-7 shrink-0 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-3 w-full max-w-[180px]" />
                        <Skeleton className="mt-2 h-2.5 w-16" />
                      </div>
                    </li>
                  ))
                : activity.map((item) => {
                    const user = getUser(item.userId);
                    return (
                      <li key={item.id} className="flex gap-3">
                        <Avatar initials={user.initials} color={user.color} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] leading-snug text-ink">
                            <span className="font-medium">{user.name}</span>{" "}
                            <span className="text-ink-muted">{item.action}</span>{" "}
                            <span className="font-medium">{item.target}</span>
                          </p>
                          <p className="mt-0.5 text-[11.5px] text-ink-faint">{relativeTime(item.time)}</p>
                        </div>
                      </li>
                    );
                  })}
            </ul>
          </section>
        </div>
      </div>

      <NewTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={(input) => {
          addTask(input);
          setModalOpen(false);
          showToast("Task added successfully");
        }}
      />
    </div>
  );
}
