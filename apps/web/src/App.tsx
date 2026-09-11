import { useEffect, useState, type ReactNode } from "react";
import { MessageCircle, Clock, Phone as PhoneIcon, Settings as SettingsIcon } from "lucide-react";
import { chats, contacts, getChat, getContact } from "./data/mockData";
import { useMediaQuery } from "./hooks/useMediaQuery";
import TabBar, { type Tab } from "./components/primitives/TabBar";
import ChatList from "./screens/ChatList";
import Conversation from "./screens/Conversation";
import ContactProfile from "./screens/ContactProfile";
import GroupInfo from "./screens/GroupInfo";
import NewChatPicker from "./screens/NewChatPicker";
import Settings from "./screens/Settings";
import Privacy from "./screens/Privacy";
import CallScreen from "./screens/CallScreen";
import EmptyState from "./screens/EmptyState";
import styles from "./App.module.css";

type SettingsSection = "root" | "privacy";
type DetailPanel = "none" | "contact" | "group";

export default function App() {
  const isDesktop = useMediaQuery("(min-width: 900px)");

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [detailPanel, setDetailPanel] = useState<DetailPanel>("none");
  const [showNewChat, setShowNewChat] = useState(false);
  const [settingsSection, setSettingsSection] = useState<SettingsSection>("root");
  const [activeCallChatId, setActiveCallChatId] = useState<string | null>(null);
  const [readReceipts, setReadReceipts] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const selectedChat = selectedChatId ? getChat(selectedChatId) : undefined;

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    setDetailPanel("none");
    setShowNewChat(false);
    setSettingsSection("root");
  }

  function handleSelectChat(id: string) {
    setSelectedChatId(id);
    setDetailPanel("none");
    setShowNewChat(false);
  }

  function handleSelectNewContact(contactId: string) {
    const chat = chats.find((c) => c.contactId === contactId);
    if (chat) {
      setSelectedChatId(chat.id);
      setDetailPanel("none");
    }
    setShowNewChat(false);
  }

  function handleOpenInfo() {
    if (!selectedChat) return;
    setDetailPanel(selectedChat.kind === "group" ? "group" : "contact");
  }

  const commonScreens = (variant: "mobile" | "desktop") => {
    if (activeCallChatId) {
      const callChat = getChat(activeCallChatId);
      if (callChat) {
        return (
          <CallScreen
            chat={callChat}
            variant={variant === "mobile" ? "mobile" : "desktop"}
            onEndCall={() => setActiveCallChatId(null)}
          />
        );
      }
    }
    return null;
  };

  if (isDesktop) {
    const callOverlay = commonScreens("desktop");
    if (callOverlay) {
      return <div className={styles.app}>{callOverlay}</div>;
    }

    let sidebar: ReactNode;
    if (activeTab === "chats") {
      sidebar = showNewChat ? (
        <NewChatPicker
          contacts={contacts}
          onCancel={() => setShowNewChat(false)}
          onSelectContact={handleSelectNewContact}
        />
      ) : (
        <ChatList
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
          onOpenNewChat={() => setShowNewChat(true)}
          variant="sidebar"
        />
      );
    } else if (activeTab === "settings") {
      sidebar = (
        <Settings
          variant="sidebar"
          activeSection={settingsSection === "privacy" ? "privacy" : null}
          darkMode={theme === "dark"}
          onToggleDarkMode={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          onOpenPrivacy={() => setSettingsSection("privacy")}
        />
      );
    } else {
      sidebar = (
        <div className={styles.tabSidebar}>
          <div className={styles.tabSidebarHeader}>
            {activeTab === "status" ? "Status" : "Calls"}
          </div>
          <EmptyState
            icon={
              activeTab === "status" ? (
                <Clock size={40} strokeWidth={1.5} />
              ) : (
                <PhoneIcon size={40} strokeWidth={1.5} />
              )
            }
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
        center = (
          <Conversation
            chat={selectedChat}
            contact={selectedChat.contactId ? getContact(selectedChat.contactId) : undefined}
            showBack={false}
            onBack={() => setSelectedChatId(null)}
            onOpenInfo={handleOpenInfo}
            onStartCall={() => setActiveCallChatId(selectedChat.id)}
          />
        );
      } else {
        center = (
          <EmptyState
            icon={<MessageCircle size={64} strokeWidth={1.5} />}
            title="Select a chat to start messaging"
          />
        );
      }
    } else if (activeTab === "settings") {
      center =
        settingsSection === "privacy" ? (
          <Privacy
            variant="desktop"
            readReceipts={readReceipts}
            onToggleReadReceipts={() => setReadReceipts((r) => !r)}
            onBack={() => setSettingsSection("root")}
          />
        ) : (
          <EmptyState
            icon={<SettingsIcon size={64} strokeWidth={1.5} />}
            title="Select a setting"
          />
        );
    } else {
      center = (
        <EmptyState
          icon={
            activeTab === "status" ? (
              <Clock size={64} strokeWidth={1.5} />
            ) : (
              <PhoneIcon size={64} strokeWidth={1.5} />
            )
          }
          title={activeTab === "status" ? "Status updates from your contacts" : "Your recent calls"}
        />
      );
    }

    const showRightPanel = activeTab === "chats" && !!selectedChat && detailPanel !== "none";

    return (
      <div className={styles.app}>
        <div className={styles.desktopFrame}>
          <TabBar active={activeTab} onChange={handleTabChange} orientation="vertical" />
          <div className={styles.sidebarPane}>{sidebar}</div>
          <div className={styles.centerPane}>{center}</div>
          {showRightPanel && selectedChat && (
            <div className={styles.rightPane}>
              {detailPanel === "contact" && selectedChat.contactId ? (
                <ContactProfile
                  contact={getContact(selectedChat.contactId)!}
                  variant="panel"
                  onBack={() => setDetailPanel("none")}
                  onMessage={() => setDetailPanel("none")}
                  onCall={() => setActiveCallChatId(selectedChat.id)}
                />
              ) : (
                <GroupInfo
                  chat={selectedChat}
                  members={(selectedChat.memberIds ?? [])
                    .map((id) => getContact(id)!)
                    .filter(Boolean)}
                  variant="panel"
                  onBack={() => setDetailPanel("none")}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile layout
  const callOverlay = commonScreens("mobile");
  if (callOverlay) {
    return <div className={styles.app}>{callOverlay}</div>;
  }

  let mobileScreen: ReactNode;
  let showTabBar = false;

  if (showNewChat) {
    mobileScreen = (
      <NewChatPicker
        contacts={contacts}
        onCancel={() => setShowNewChat(false)}
        onSelectContact={handleSelectNewContact}
      />
    );
  } else if (detailPanel === "contact" && selectedChat?.contactId) {
    mobileScreen = (
      <ContactProfile
        contact={getContact(selectedChat.contactId)!}
        variant="mobile"
        onBack={() => setDetailPanel("none")}
        onMessage={() => setDetailPanel("none")}
        onCall={() => setActiveCallChatId(selectedChat.id)}
      />
    );
  } else if (detailPanel === "group" && selectedChat) {
    mobileScreen = (
      <GroupInfo
        chat={selectedChat}
        members={(selectedChat.memberIds ?? []).map((id) => getContact(id)!).filter(Boolean)}
        variant="mobile"
        onBack={() => setDetailPanel("none")}
      />
    );
  } else if (activeTab === "settings" && settingsSection === "privacy") {
    mobileScreen = (
      <Privacy
        variant="mobile"
        readReceipts={readReceipts}
        onToggleReadReceipts={() => setReadReceipts((r) => !r)}
        onBack={() => setSettingsSection("root")}
      />
    );
  } else if (activeTab === "settings") {
    showTabBar = true;
    mobileScreen = (
      <Settings
        variant="mobile"
        activeSection={null}
        darkMode={theme === "dark"}
        onToggleDarkMode={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        onOpenPrivacy={() => setSettingsSection("privacy")}
      />
    );
  } else if (activeTab === "chats" && selectedChat) {
    mobileScreen = (
      <Conversation
        chat={selectedChat}
        contact={selectedChat.contactId ? getContact(selectedChat.contactId) : undefined}
        showBack
        onBack={() => setSelectedChatId(null)}
        onOpenInfo={handleOpenInfo}
        onStartCall={() => setActiveCallChatId(selectedChat.id)}
      />
    );
  } else if (activeTab === "chats") {
    showTabBar = true;
    mobileScreen = (
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
        onOpenNewChat={() => setShowNewChat(true)}
        variant="mobile"
      />
    );
  } else if (activeTab === "status") {
    showTabBar = true;
    mobileScreen = (
      <EmptyState icon={<Clock size={64} strokeWidth={1.5} />} title="No status updates yet" />
    );
  } else {
    showTabBar = true;
    mobileScreen = (
      <EmptyState icon={<PhoneIcon size={64} strokeWidth={1.5} />} title="No recent calls" />
    );
  }

  return (
    <div className={styles.app}>
      <div className={styles.mobileFrame}>
        <div className={styles.mobileScreen}>{mobileScreen}</div>
        {showTabBar && <TabBar active={activeTab} onChange={handleTabChange} />}
      </div>
    </div>
  );
}
