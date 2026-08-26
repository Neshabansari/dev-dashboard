import { Check } from "lucide-react";
import Badge from "../ui/Badge.jsx";
import Avatar from "../ui/Avatar.jsx";
import { getProject, getUser, priorityMeta } from "../../data/mockData.js";
import { dueLabel } from "../../lib/format.js";

export default function TaskRow({ task, onToggleDone }) {
  const project = getProject(task.projectId);
  const assignee = getUser(task.assigneeId);
  const priority = priorityMeta[task.priority];
  const isDone = task.status === "done";
  const due = dueLabel(task.dueDate);

  return (
    <div className="group flex items-center gap-3 border-b border-line px-4 py-3.5 last:border-b-0 hover:bg-canvas/60 sm:gap-4 sm:px-5">
      <button
        onClick={() => onToggleDone(task.id)}
        aria-label={isDone ? "Mark as not done" : "Mark as done"}
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150 ${
          isDone
            ? "border-accent-solid bg-accent-solid text-white"
            : "border-line-strong text-transparent hover:border-accent"
        }`}
      >
        <Check size={12} strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-[13.5px] font-medium ${
            isDone ? "text-ink-faint line-through" : "text-ink"
          }`}
        >
          {task.title}
        </p>
        <p className="mt-0.5 truncate font-mono text-[11px] text-ink-faint">
          {project?.key} · {task.id.toUpperCase()}
        </p>
      </div>

      <span className="hidden shrink-0 sm:block">
        <Badge color={priority.color}>{priority.label}</Badge>
      </span>

      <span
        className={`hidden w-20 shrink-0 text-right text-xs font-medium md:block ${
          due.urgent && !isDone ? "text-danger" : "text-ink-faint"
        }`}
      >
        {isDone ? "—" : due.text}
      </span>

      {assignee && (
        <span className="shrink-0" title={assignee.name}>
          <Avatar initials={assignee.initials} color={assignee.color} size="sm" />
        </span>
      )}
    </div>
  );
}
