import { TABS, type Tab } from "./tabs";
import styles from "./TabBar.module.css";

export type { Tab };

interface TabBarProps {
  active: Tab;
  onChange: (tab: Tab) => void;
  orientation?: "horizontal" | "vertical";
}

export default function TabBar({ active, onChange, orientation = "horizontal" }: TabBarProps) {
  return (
    <nav className={`${styles.bar} ${orientation === "vertical" ? styles.vertical : ""}`}>
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          className={`${styles.tab} ${id === active ? styles.active : ""}`}
          onClick={() => onChange(id)}
        >
          <Icon size={20} strokeWidth={2} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
