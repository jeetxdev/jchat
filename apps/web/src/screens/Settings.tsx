import { Lock, MessageCircle, Bell, Moon, Image as ImageIcon } from "lucide-react";
import Avatar from "../components/primitives/Avatar";
import SectionLabel from "../components/primitives/SectionLabel";
import styles from "./Settings.module.css";

export type SettingsSection = "privacy" | "wallpaper";

interface SettingsProps {
  variant: "mobile" | "sidebar";
  activeSection: SettingsSection | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenPrivacy: () => void;
  onOpenWallpaper: () => void;
}

export default function Settings({
  variant,
  activeSection,
  darkMode,
  onToggleDarkMode,
  onOpenPrivacy,
  onOpenWallpaper,
}: SettingsProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
      </div>

      <div className={styles.list}>
        <div className={styles.profileRow}>
          <Avatar initials="YO" color="blue" size={56} />
          <div>
            <strong className={styles.profileName}>You</strong>
            <div className={styles.profileStatus}>Available for pixel-pushing</div>
          </div>
        </div>

        <div className={styles.sectionLabel}>
          <SectionLabel>Account</SectionLabel>
        </div>

        <button
          type="button"
          className={`${styles.row} ${variant === "sidebar" && activeSection === "privacy" ? styles.rowActive : ""}`}
          onClick={onOpenPrivacy}
        >
          <div className={styles.rowIcon}>
            <Lock size={16} strokeWidth={2} />
          </div>
          <span>Privacy</span>
        </button>

        <button type="button" className={styles.row}>
          <div className={styles.rowIcon}>
            <MessageCircle size={16} strokeWidth={2} />
          </div>
          <span>Chats</span>
        </button>

        <button
          type="button"
          className={`${styles.row} ${variant === "sidebar" && activeSection === "wallpaper" ? styles.rowActive : ""}`}
          onClick={onOpenWallpaper}
        >
          <div className={styles.rowIcon}>
            <ImageIcon size={16} strokeWidth={2} />
          </div>
          <span>Chat wallpaper</span>
        </button>

        <button type="button" className={styles.row}>
          <div className={styles.rowIcon}>
            <Bell size={16} strokeWidth={2} />
          </div>
          <span>Notifications</span>
        </button>

        <button type="button" className={styles.row} onClick={onToggleDarkMode}>
          <div className={styles.rowIcon}>
            <Moon size={16} strokeWidth={2} />
          </div>
          <span className={styles.rowLabel}>Dark mode</span>
          <span className={`${styles.toggle} ${darkMode ? styles.toggleOn : ""}`}>
            <span className={styles.toggleThumb} />
          </span>
        </button>
      </div>
    </div>
  );
}
