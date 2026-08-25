import { CheckCircle2, AlertTriangle, X } from "lucide-react";
import { useToast } from "../../context/ToastContext.jsx";

const variantMeta = {
  success: { icon: CheckCircle2, iconClass: "text-accent-hover bg-accent-tint" },
  error: { icon: AlertTriangle, iconClass: "text-danger bg-danger-tint" },
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 sm:bottom-6 sm:right-6">
      {toasts.map((toast) => {
        const meta = variantMeta[toast.variant] || variantMeta.success;
        const Icon = meta.icon;
        return (
          <div
            key={toast.id}
            role="status"
            className="animate-toast-in pointer-events-auto flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-elevated"
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${meta.iconClass}`}>
              <Icon size={15} strokeWidth={2.25} />
            </span>
            <p className="text-[13.5px] font-medium text-ink">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="ml-1 shrink-0 rounded-md p-1 text-ink-faint hover:bg-canvas hover:text-ink-muted"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
