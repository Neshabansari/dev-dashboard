import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 animate-fade-in"
      onMouseDown={(e) => {
        if (!panelRef.current?.contains(e.target)) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={panelRef}
        className="w-full max-w-md rounded-xl border border-line bg-surface shadow-elevated"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-[15px] font-semibold text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-ink-muted hover:bg-canvas hover:text-ink"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto scrollbar-thin p-5">{children}</div>
      </div>
    </div>
  );
}
