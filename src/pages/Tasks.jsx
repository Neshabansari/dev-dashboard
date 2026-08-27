import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckSquare, Plus, SearchX } from "lucide-react";
import SearchFilterBar from "../components/SearchFilterBar.jsx";
import TaskRow from "../components/cards/TaskRow.jsx";
import Button from "../components/ui/Button.jsx";
import NewTaskModal from "../components/NewTaskModal.jsx";
import { TaskRowSkeleton } from "../components/ui/Skeleton.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import useLoading from "../lib/useLoading.js";
import { useTasks } from "../context/TasksContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { priorityMeta, projects } from "../data/mockData.js";
import { daysUntil } from "../lib/format.js";

const tabs = [
  { value: "all", label: "All" },
  { value: "todo", label: "To do" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
  { value: "overdue", label: "Overdue" },
];

function isOverdue(task) {
  return task.status !== "done" && daysUntil(task.dueDate) < 0;
}

export default function Tasks() {
  const loading = useLoading(600);
  const { tasks, toggleDone, addTask } = useTasks();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [priority, setPriority] = useState("all");
  const [project, setProject] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  // Seed the active tab from a link like /tasks?status=done or /tasks?overdue=true
  // (used by the dashboard's clickable KPI cards and deadline widgets).
  useEffect(() => {
    const status = searchParams.get("status");
    const overdue = searchParams.get("overdue");
    if (overdue === "true") {
      setTab("overdue");
    } else if (status && tabs.some((t) => t.value === status)) {
      setTab(status);
    }
  }, [searchParams]);

  function handleCreated(input) {
    addTask(input);
    setModalOpen(false);
    setTab("all");
    showToast("Task added successfully");
  }

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
      const matchesTab = tab === "all" || (tab === "overdue" ? isOverdue(t) : t.status === tab);
      const matchesPriority = priority === "all" || t.priority === priority;
      const matchesProject = project === "all" || t.projectId === project;
      return matchesSearch && matchesTab && matchesPriority && matchesProject;
    });
  }, [tasks, search, tab, priority, project]);

  const counts = useMemo(() => {
    return {
      all: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      "in-progress": tasks.filter((t) => t.status === "in-progress").length,
      done: tasks.filter((t) => t.status === "done").length,
      overdue: tasks.filter(isOverdue).length,
    };
  }, [tasks]);

  const hasAnyFilter = search.trim() !== "" || priority !== "all" || project !== "all" || tab !== "all";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
            Tasks
          </h2>
          <p className="mt-1 text-[13.5px] text-ink-muted">
            {counts.done} of {tasks.length} tasks completed
          </p>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>
          New task
        </Button>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-[13.5px] font-medium transition-colors duration-150 ${
              tab === t.value
                ? "border-accent text-ink"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {t.label}
            <span
              className={`rounded-full px-1.5 py-0.5 font-mono text-[10.5px] ${
                tab === t.value
                  ? t.value === "overdue"
                    ? "bg-danger-tint text-danger"
                    : "bg-accent-tint text-accent-hover"
                  : "bg-canvas text-ink-faint"
              }`}
            >
              {counts[t.value]}
            </span>
          </button>
        ))}
      </div>

      <SearchFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search tasks…"
        filters={[
          {
            label: "Priority",
            value: priority,
            onChange: setPriority,
            options: Object.entries(priorityMeta).map(([value, meta]) => ({ value, label: meta.label })),
          },
          {
            label: "Project",
            value: project,
            onChange: setProject,
            options: projects.map((p) => ({ value: p.id, label: p.name })),
          },
        ]}
      />

      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <TaskRowSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <div className="p-2">
            <EmptyState
              icon={hasAnyFilter ? SearchX : CheckSquare}
              title={hasAnyFilter ? "No tasks match your filters" : "No tasks yet"}
              description={
                hasAnyFilter
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "Tasks assigned to your projects will show up here."
              }
            />
          </div>
        ) : (
          filtered.map((task) => <TaskRow key={task.id} task={task} onToggleDone={toggleDone} />)
        )}
      </div>

      <NewTaskModal open={modalOpen} onClose={() => setModalOpen(false)} onCreated={handleCreated} />
    </div>
  );
}
