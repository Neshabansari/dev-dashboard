import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FolderKanban, SearchX } from "lucide-react";
import SearchFilterBar from "../components/SearchFilterBar.jsx";
import ProjectCard from "../components/cards/ProjectCard.jsx";
import { ProjectCardSkeleton } from "../components/ui/Skeleton.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import useLoading from "../lib/useLoading.js";
import { projects, projectStatusMeta } from "../data/mockData.js";

export default function Projects() {
  const loading = useLoading(600);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // Seed the status filter from a link like /projects?status=active
  // (used by the dashboard's clickable "Active projects" KPI card).
  useEffect(() => {
    const param = searchParams.get("status");
    if (param && Object.keys(projectStatusMeta).includes(param)) {
      setStatus(param);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || p.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const hasAnyFilter = search.trim() !== "" || status !== "all";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
          Projects
        </h2>
        <p className="mt-1 text-[13.5px] text-ink-muted">
          {projects.length} projects across your workspace
        </p>
      </div>

      <SearchFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search projects…"
        filters={[
          {
            label: "Status",
            value: status,
            onChange: setStatus,
            options: Object.entries(projectStatusMeta).map(([value, meta]) => ({
              value,
              label: meta.label,
            })),
          },
        ]}
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={hasAnyFilter ? SearchX : FolderKanban}
          title={hasAnyFilter ? "No projects match your filters" : "No projects yet"}
          description={
            hasAnyFilter
              ? "Try a different search term or status."
              : "Projects you create will show up here."
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
