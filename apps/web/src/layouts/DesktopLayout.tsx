import {
  MessageCircle,
  Clock,
  Phone as PhoneIcon,
  Settings as SettingsIcon,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import type { AppState } from "../hooks/useAppState";
import TabBar from "../components/primitives/TabBar";
import EmptyState from "../screens/EmptyState";
import styles from "./DesktopLayout.module.css";

type DesktopLayoutProps = AppState;

const TAB_ICONS: Record<"status" | "calls", LucideIcon> = {
  status: Clock,
  calls: PhoneIcon,
};

export default function DesktopLayout({
  activeTab,
  selectedChat,
  detailPanel,
  showNewChat,
  settingsSection,
  changeTab,
  screens,
}: DesktopLayoutProps) {
  const call = screens.call("desktop");
  if (call) return call;

  const OtherTabIcon = TAB_ICONS[activeTab === "status" ? "status" : "calls"];

  let sidebar: ReactNode;
  if (activeTab === "chats") {
    sidebar = showNewChat ? screens.newChatPicker() : screens.chatList("sidebar");
  } else if (activeTab === "settings") {
    sidebar = screens.settings("sidebar");
  } else {
    sidebar = (
      <div className={styles.tabSidebar}>
        <div className={styles.tabSidebarHeader}>{activeTab === "status" ? "Status" : "Calls"}</div>
        <EmptyState
          icon={<OtherTabIcon size={40} strokeWidth={1.5} />}
          title={activeTab === "status" ? "No status updates" : "No recent calls"}
        />
      </div>
    );
  }

  let center: ReactNode;
  if (activeTab === "chats") {
    if (showNewChat) {
      center = (
        <EmptyState
          icon={<MessageCircle size={64} strokeWidth={1.5} />}
          title="Pick a contact to start chatting"
        />
      );
    } else if (selectedChat) {
      center = screens.conversation(selectedChat, false);
    } else {
      center = (
        <EmptyState
          icon={<MessageCircle size={64} strokeWidth={1.5} />}
          title="Select a chat to start messaging"
        />
      );
    }
  } else if (activeTab === "settings") {
    if (settingsSection === "privacy") {
      center = screens.privacy("desktop");
    } else if (settingsSection === "wallpaper") {
      center = screens.defaultWallpaperPicker(false);
    } else {
      center = (
        <EmptyState icon={<SettingsIcon size={64} strokeWidth={1.5} />} title="Select a setting" />
      );
    }
  } else {
    center = (
      <EmptyState
        icon={<OtherTabIcon size={64} strokeWidth={1.5} />}
        title={activeTab === "status" ? "Status updates from your contacts" : "Your recent calls"}
      />
    );
  }

  const showRightPanel = activeTab === "chats" && !!selectedChat && detailPanel !== "none";

  return (
    <div className={styles.frame}>
      <TabBar active={activeTab} onChange={changeTab} orientation="vertical" />
      <div className={styles.sidebarPane}>{sidebar}</div>
      <div className={styles.centerPane}>{center}</div>
      {showRightPanel && selectedChat && (
        <div className={styles.rightPane}>
          {detailPanel === "wallpaper"
            ? screens.chatWallpaperPicker(selectedChat)
            : detailPanel === "contact" && selectedChat.contactId
              ? screens.contactInfo(selectedChat, "panel")
              : screens.groupInfo(selectedChat, "panel")}
        </div>
      )}
    </div>
  );
}
