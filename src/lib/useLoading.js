import { useEffect, useState } from "react";

// Simulates a network round-trip so the UI's loading states have
// something real to demonstrate. Swap for an actual fetch in Task 2/3.
export default function useLoading(ms = 700) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(timer);
  }, [ms]);

  return loading;
}
