export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-line ${className}`} />;
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <Skeleton className="h-3.5 w-20" />
      <Skeleton className="mt-4 h-7 w-16" />
      <Skeleton className="mt-3 h-3 w-28" />
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-4 w-3/4" />
      <Skeleton className="mt-2 h-3 w-full" />
      <Skeleton className="mt-1.5 h-3 w-5/6" />
      <Skeleton className="mt-5 h-1.5 w-full rounded-full" />
      <div className="mt-5 flex items-center justify-between">
        <div className="flex -space-x-2">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function TaskRowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-line px-5 py-4">
      <Skeleton className="h-4 w-4 rounded-[4px]" />
      <Skeleton className="h-3.5 flex-1 max-w-sm" />
      <Skeleton className="hidden h-5 w-20 rounded-full sm:block" />
      <Skeleton className="hidden h-5 w-16 rounded-full md:block" />
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
  );
}
