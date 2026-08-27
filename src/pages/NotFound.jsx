import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/ui/Button.jsx";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-tint text-accent-hover">
        <Compass size={22} strokeWidth={1.75} />
      </span>
      <p className="mt-5 font-mono text-xs font-medium tracking-wide text-ink-faint">404</p>
      <h2 className="mt-1.5 font-display text-xl font-semibold text-ink">Page not found</h2>
      <p className="mt-1.5 max-w-xs text-sm text-ink-muted">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="mt-6">
        <Button variant="secondary">Back to dashboard</Button>
      </Link>
    </div>
  );
}
