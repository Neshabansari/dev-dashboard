// Mock data layer.
// Shaped to match what the Task 2 REST API will eventually return,
// so swapping this module for real fetch calls later is a drop-in change.

export const currentUser = {
  id: "u1",
  name: "Neshab Ansari",
  role: "Java Developer",
  email: "neshab.ansari@devtrack.dev",
  initials: "NA",
  color: "accent",
};

export const users = [
  currentUser,
  { id: "u2", name: "Diego Ferreira", role: "Backend Engineer", initials: "DF", color: "blue" },
  { id: "u3", name: "Priya Natarajan", role: "Product Designer", initials: "PN", color: "violet" },
  { id: "u4", name: "Sam Whitfield", role: "DevOps Engineer", initials: "SW", color: "amber" },
  { id: "u5", name: "Lena Kowalski", role: "QA Engineer", initials: "LK", color: "blue" },
  { id: "u6", name: "Arjun Mehta", role: "Backend Engineer", initials: "AM", color: "violet" },
];

export const projects = [
  {
    id: "p1",
    key: "GTW",
    name: "API Gateway Revamp",
    description: "Consolidate five legacy services behind a single versioned gateway with rate limiting.",
    status: "active",
    color: "accent",
    progress: 68,
    dueDate: "2026-09-19",
    memberIds: ["u1", "u2", "u4"],
  },
  {
    id: "p2",
    key: "DSY",
    name: "Design System v3",
    description: "Token-based component library covering forms, data display, and navigation primitives.",
    status: "active",
    color: "violet",
    progress: 42,
    dueDate: "2026-10-03",
    memberIds: ["u3", "u1", "u5"],
  },
  {
    id: "p3",
    key: "OBS",
    name: "Observability Stack",
    description: "Structured logging, tracing, and alerting rollout across all production services.",
    status: "planning",
    color: "blue",
    progress: 12,
    dueDate: "2026-11-14",
    memberIds: ["u4", "u6"],
  },
  {
    id: "p4",
    key: "BIL",
    name: "Billing Migration",
    description: "Move subscription billing from the legacy invoicing service to the new ledger engine.",
    status: "active",
    color: "amber",
    progress: 81,
    dueDate: "2026-09-08",
    memberIds: ["u2", "u6", "u5"],
  },
  {
    id: "p5",
    key: "ONB",
    name: "Mobile Onboarding Flow",
    description: "Redesign first-run experience to reduce drop-off during account setup.",
    status: "completed",
    color: "accent",
    progress: 100,
    dueDate: "2026-08-01",
    memberIds: ["u3", "u1"],
  },
  {
    id: "p6",
    key: "SEC",
    name: "Access Control Audit",
    description: "Review and tighten role-based permissions ahead of the SOC 2 renewal.",
    status: "paused",
    color: "blue",
    progress: 25,
    dueDate: "2026-12-05",
    memberIds: ["u4", "u2"],
  },
];

export const tasks = [
  { id: "t1", title: "Define rate-limit policy per client tier", projectId: "p1", status: "in-progress", priority: "high", assigneeId: "u1", dueDate: "2026-09-04" },
  { id: "t2", title: "Migrate auth middleware to gateway layer", projectId: "p1", status: "in-progress", priority: "urgent", assigneeId: "u2", dueDate: "2026-09-03" },
  { id: "t3", title: "Write load test suite for gateway", projectId: "p1", status: "todo", priority: "medium", assigneeId: "u4", dueDate: "2026-09-11" },
  { id: "t4", title: "Deprecate legacy /v1 routes", projectId: "p1", status: "done", priority: "low", assigneeId: "u1", dueDate: "2026-08-28" },
  { id: "t5", title: "Publish gateway changelog to internal wiki", projectId: "p1", status: "todo", priority: "low", assigneeId: "u2", dueDate: "2026-09-15" },

  { id: "t6", title: "Ship Button, Input, and Select primitives", projectId: "p2", status: "done", priority: "high", assigneeId: "u3", dueDate: "2026-08-20" },
  { id: "t7", title: "Draft color contrast audit for dark surfaces", projectId: "p2", status: "in-progress", priority: "medium", assigneeId: "u3", dueDate: "2026-09-06" },
  { id: "t8", title: "Build DataTable with sort and filter slots", projectId: "p2", status: "in-progress", priority: "high", assigneeId: "u1", dueDate: "2026-09-09" },
  { id: "t9", title: "Document spacing scale in Storybook", projectId: "p2", status: "todo", priority: "low", assigneeId: "u5", dueDate: "2026-09-20" },

  { id: "t10", title: "Select tracing vendor and pilot integration", projectId: "p3", status: "todo", priority: "medium", assigneeId: "u4", dueDate: "2026-09-25" },
  { id: "t11", title: "Draft log retention policy", projectId: "p3", status: "todo", priority: "low", assigneeId: "u6", dueDate: "2026-10-02" },

  { id: "t12", title: "Reconcile ledger balances against legacy invoices", projectId: "p4", status: "in-progress", priority: "urgent", assigneeId: "u2", dueDate: "2026-09-02" },
  { id: "t13", title: "Build dunning email sequence", projectId: "p4", status: "in-progress", priority: "medium", assigneeId: "u6", dueDate: "2026-09-05" },
  { id: "t14", title: "Cut over test-mode merchants", projectId: "p4", status: "done", priority: "high", assigneeId: "u5", dueDate: "2026-08-26" },
  { id: "t15", title: "Archive legacy invoicing cron jobs", projectId: "p4", status: "todo", priority: "low", assigneeId: "u2", dueDate: "2026-09-12" },

  { id: "t16", title: "A/B test simplified signup form", projectId: "p5", status: "done", priority: "medium", assigneeId: "u3", dueDate: "2026-07-22" },
  { id: "t17", title: "Instrument onboarding funnel analytics", projectId: "p5", status: "done", priority: "medium", assigneeId: "u1", dueDate: "2026-07-30" },

  { id: "t18", title: "Inventory service-to-service permissions", projectId: "p6", status: "todo", priority: "high", assigneeId: "u4", dueDate: "2026-09-18" },
  { id: "t19", title: "Remove unused admin scopes", projectId: "p6", status: "todo", priority: "medium", assigneeId: "u2", dueDate: "2026-09-22" },
];

export const activity = [
  { id: "a1", userId: "u2", action: "marked done", target: "Cut over test-mode merchants", time: "2026-09-01T08:12:00" },
  { id: "a2", userId: "u3", action: "commented on", target: "Draft color contrast audit for dark surfaces", time: "2026-09-01T07:40:00" },
  { id: "a3", userId: "u1", action: "opened a PR for", target: "Build DataTable with sort and filter slots", time: "2026-08-31T22:05:00" },
  { id: "a4", userId: "u4", action: "moved to In progress", target: "Select tracing vendor and pilot integration", time: "2026-08-31T18:30:00" },
  { id: "a5", userId: "u6", action: "created", target: "Archive legacy invoicing cron jobs", time: "2026-08-31T15:11:00" },
];

export const statusMeta = {
  "todo": { label: "To do", color: "ink-faint" },
  "in-progress": { label: "In progress", color: "blue" },
  "done": { label: "Done", color: "accent" },
};

export const priorityMeta = {
  low: { label: "Low", color: "ink-faint" },
  medium: { label: "Medium", color: "blue" },
  high: { label: "High", color: "amber" },
  urgent: { label: "Urgent", color: "danger" },
};

export const projectStatusMeta = {
  active: { label: "Active", color: "accent" },
  planning: { label: "Planning", color: "blue" },
  paused: { label: "Paused", color: "amber" },
  completed: { label: "Completed", color: "ink-faint" },
};

export function getUser(id) {
  return users.find((u) => u.id === id);
}

export function getProject(id) {
  return projects.find((p) => p.id === id);
}
