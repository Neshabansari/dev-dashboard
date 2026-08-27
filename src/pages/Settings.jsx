import { useState } from "react";
import { Check, Moon, Sun } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Avatar from "../components/ui/Avatar.jsx";
import Switch from "../components/ui/Switch.jsx";
import { Field, TextInput } from "../components/ui/FormField.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { currentUser } from "../data/mockData.js";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role);
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    reminders: true,
    digest: false,
    mentions: true,
  });

  function updateNotification(key, value) {
    setNotifications((n) => ({ ...n, [key]: value }));
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
          Settings
        </h2>
        <p className="mt-1 text-[13.5px] text-ink-muted">
          Manage your profile, appearance, and notification preferences.
        </p>
      </div>

      {/* Profile */}
      <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
        <h3 className="font-display text-[15px] font-semibold text-ink">Profile</h3>
        <p className="mt-1 text-[12.5px] text-ink-muted">
          This information is only stored locally in this session.
        </p>

        <form onSubmit={handleSaveProfile} className="mt-5 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Avatar initials={currentUser.initials} color={currentUser.color} size="lg" />
            <div>
              <p className="text-[13.5px] font-medium text-ink">{name || currentUser.name}</p>
              <p className="text-[12.5px] text-ink-muted">{currentUser.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <TextInput value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Role">
              <TextInput value={role} onChange={(e) => setRole(e.target.value)} />
            </Field>
            <Field label="Email">
              <TextInput value={currentUser.email} disabled className="opacity-60" />
            </Field>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit">Save changes</Button>
            {saved && (
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-accent-hover">
                <Check size={15} strokeWidth={2.5} />
                Saved
              </span>
            )}
          </div>
        </form>
      </section>

      {/* Appearance */}
      <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
        <h3 className="font-display text-[15px] font-semibold text-ink">Appearance</h3>
        <p className="mt-1 text-[12.5px] text-ink-muted">
          Choose how Pulse looks on this device.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:max-w-sm">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`flex flex-col items-center gap-2.5 rounded-xl border p-4 transition-colors duration-150 ${
              theme === "light" ? "border-accent bg-accent-tint" : "border-line hover:border-line-strong"
            }`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas text-ink-muted">
              <Sun size={17} strokeWidth={2} />
            </span>
            <span className="text-[13px] font-medium text-ink">Light</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex flex-col items-center gap-2.5 rounded-xl border p-4 transition-colors duration-150 ${
              theme === "dark" ? "border-accent bg-accent-tint" : "border-line hover:border-line-strong"
            }`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas text-ink-muted">
              <Moon size={17} strokeWidth={2} />
            </span>
            <span className="text-[13px] font-medium text-ink">Dark</span>
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
        <h3 className="font-display text-[15px] font-semibold text-ink">Notifications</h3>
        <p className="mt-1 text-[12.5px] text-ink-muted">
          Choose what you'd like to be notified about.
        </p>

        <div className="mt-3 flex flex-col divide-y divide-line">
          <Switch
            checked={notifications.email}
            onChange={(v) => updateNotification("email", v)}
            label="Email notifications"
            description="Get emailed about important updates on your projects."
          />
          <Switch
            checked={notifications.reminders}
            onChange={(v) => updateNotification("reminders", v)}
            label="Task reminders"
            description="Reminders for tasks approaching their due date."
          />
          <Switch
            checked={notifications.digest}
            onChange={(v) => updateNotification("digest", v)}
            label="Weekly digest"
            description="A weekly summary of activity across your workspace."
          />
          <Switch
            checked={notifications.mentions}
            onChange={(v) => updateNotification("mentions", v)}
            label="Mentions"
            description="Notify me when someone mentions me in a comment."
          />
        </div>
      </section>
    </div>
  );
}
