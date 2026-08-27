import { useState } from "react";
import Modal from "./ui/Modal.jsx";
import Button from "./ui/Button.jsx";
import { Field, TextInput, Select } from "./ui/FormField.jsx";
import { projects, users, priorityMeta, currentUser } from "../data/mockData.js";

const emptyForm = {
  title: "",
  projectId: "",
  priority: "medium",
  assigneeId: currentUser.id,
  dueDate: "",
};

export default function NewTaskModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  }

  function handleClose() {
    setForm(emptyForm);
    setErrors({});
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "Give the task a title.";
    if (!form.projectId) nextErrors.projectId = "Choose a project.";
    if (!form.dueDate) nextErrors.dueDate = "Pick a due date.";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onCreated({
      title: form.title.trim(),
      projectId: form.projectId,
      priority: form.priority,
      assigneeId: form.assigneeId,
      dueDate: form.dueDate,
    });
    setForm(emptyForm);
    setErrors({});
  }

  return (
    <Modal open={open} onClose={handleClose} title="New task">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Title" required error={errors.title}>
          <TextInput
            autoFocus
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Write integration tests for auth flow"
            error={errors.title}
          />
        </Field>

        <Field label="Project" required error={errors.projectId}>
          <Select
            value={form.projectId}
            onChange={(e) => update("projectId", e.target.value)}
            error={errors.projectId}
          >
            <option value="">Select a project…</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Priority">
            <Select value={form.priority} onChange={(e) => update("priority", e.target.value)}>
              {Object.entries(priorityMeta).map(([value, meta]) => (
                <option key={value} value={value}>
                  {meta.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Assignee">
            <Select value={form.assigneeId} onChange={(e) => update("assigneeId", e.target.value)}>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Due date" required error={errors.dueDate}>
          <TextInput
            type="date"
            value={form.dueDate}
            onChange={(e) => update("dueDate", e.target.value)}
            error={errors.dueDate}
          />
        </Field>

        <div className="mt-1 flex items-center justify-end gap-2.5">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">Create task</Button>
        </div>
      </form>
    </Modal>
  );
}
