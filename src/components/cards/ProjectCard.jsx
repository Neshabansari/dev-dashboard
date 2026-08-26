import Badge from "../ui/Badge.jsx";
import Avatar from "../ui/Avatar.jsx";
import ProgressBar from "../ui/ProgressBar.jsx";
import { getUser, projectStatusMeta } from "../../data/mockData.js";
import { dueLabel } from "../../lib/format.js";

export default function ProjectCard({ project }) {
  const status = projectStatusMeta[project.status];
  const isDone = project.status === "completed";
  const due = dueLabel(project.dueDate);
  const members = project.memberIds.map(getUser).filter(Boolean);

  return (
    <div className="group flex flex-col rounded-xl border border-line bg-surface p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-md bg-canvas px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide text-ink-muted">
          {project.key}
        </span>
        <Badge color={status.color} dot>
          {status.label}
        </Badge>
      </div>

      <h3 className="mt-3 font-display text-[15px] font-semibold leading-snug text-ink group-hover:text-accent-hover">
        {project.name}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink-muted">
        {project.description}
      </p>

      <div className="mt-4">
        <ProgressBar value={project.progress} color={project.color} showLabel />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex -space-x-2">
          {members.slice(0, 3).map((m) => (
            <Avatar key={m.id} initials={m.initials} color={m.color} size="sm" ring />
          ))}
          {members.length > 3 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-canvas text-[10px] font-medium text-ink-muted ring-2 ring-surface">
              +{members.length - 3}
            </span>
          )}
        </div>
        <span
          className={`text-xs font-medium ${due.urgent && !isDone ? "text-danger" : "text-ink-faint"}`}
        >
          {isDone ? "Completed" : due.text}
        </span>
      </div>
    </div>
  );
}
