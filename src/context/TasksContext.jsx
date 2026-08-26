import { createContext, useCallback, useContext, useState } from "react";
import { tasks as seedTasks } from "../data/mockData.js";

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(seedTasks);

  const toggleDone = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t))
    );
  }, []);

  const addTask = useCallback((input) => {
    let nextId = "t1";
    setTasks((prev) => {
      const maxNum = prev.reduce((max, t) => {
        const match = /^t(\d+)$/i.exec(t.id);
        return match ? Math.max(max, Number(match[1])) : max;
      }, 0);
      nextId = `t${maxNum + 1}`;
      return [{ id: nextId, status: "todo", ...input }, ...prev];
    });
    return nextId;
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, toggleDone, addTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within a TasksProvider");
  return ctx;
}
