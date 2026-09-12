import { useEffect, useState, type ReactNode } from "react";
import type { Chat, WallpaperId } from "@jchat/shared";
import { chats, contacts, getChat, getChatWallpapers, getContact } from "../data/mockData";
import { DEFAULT_WALLPAPER_ID, getWallpaperLabel } from "../data/wallpapers";
import type { Tab } from "../components/primitives/TabBar";
import ChatList from "../screens/ChatList";
import Conversation from "../screens/Conversation";
import ContactProfile from "../screens/ContactProfile";
import GroupInfo from "../screens/GroupInfo";
import NewChatPicker from "../screens/NewChatPicker";
import Settings, { type SettingsSection } from "../screens/Settings";
import Privacy from "../screens/Privacy";
import WallpaperPicker from "../screens/WallpaperPicker";
import CallScreen from "../screens/CallScreen";

export type SettingsRoute = "root" | SettingsSection;
export type DetailPanel = "none" | "contact" | "group" | "wallpaper";

/** Each screen is built once here so both layouts wire its props identically. */
interface AppScreens {
  chatList: (variant: "mobile" | "sidebar") => ReactNode;
  newChatPicker: () => ReactNode;
  conversation: (chat: Chat, showBack: boolean) => ReactNode;
  contactInfo: (chat: Chat, variant: "mobile" | "panel") => ReactNode;
  groupInfo: (chat: Chat, variant: "mobile" | "panel") => ReactNode;
  settings: (variant: "mobile" | "sidebar") => ReactNode;
  privacy: (variant: "mobile" | "desktop") => ReactNode;
  defaultWallpaperPicker: (showBack: boolean) => ReactNode;
  chatWallpaperPicker: (chat: Chat) => ReactNode;
  call: (variant: "mobile" | "desktop") => ReactNode;
}

export interface AppState {
  activeTab: Tab;
  selectedChat: Chat | undefined;
  detailPanel: DetailPanel;
  showNewChat: boolean;
  settingsSection: SettingsRoute;
  changeTab: (tab: Tab) => void;
  screens: AppScreens;
}

export function useAppState(): AppState {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [detailPanel, setDetailPanel] = useState<DetailPanel>("none");
  const [showNewChat, setShowNewChat] = useState(false);
  const [settingsSection, setSettingsSection] = useState<SettingsRoute>("root");
  const [activeCallChatId, setActiveCallChatId] = useState<string | null>(null);
  const [readReceipts, setReadReceipts] = useState(true);
  const [defaultWallpaperId, setDefaultWallpaperId] = useState<WallpaperId>(DEFAULT_WALLPAPER_ID);
  const [chatWallpapers, setChatWallpapers] =
    useState<Record<string, WallpaperId>>(getChatWallpapers);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const selectedChat = selectedChatId ? getChat(selectedChatId) : undefined;

  function changeTab(tab: Tab) {
    setActiveTab(tab);
    setDetailPanel("none");
    setShowNewChat(false);
    setSettingsSection("root");
  }

  function selectChat(id: string) {
    setSelectedChatId(id);
    setDetailPanel("none");
    setShowNewChat(false);
  }

  function selectNewContact(contactId: string) {
    const chat = chats.find((c) => c.contactId === contactId);
    if (chat) {
      setSelectedChatId(chat.id);
      setDetailPanel("none");
    }
    setShowNewChat(false);
  }

  function openInfo() {
    if (!selectedChat) return;
    setDetailPanel(selectedChat.kind === "group" ? "group" : "contact");
  }

  function resolveWallpaperId(chatId: string): WallpaperId {
    return chatWallpapers[chatId] ?? defaultWallpaperId;
  }

  function selectChatWallpaper(chatId: string, wallpaperId: WallpaperId) {
    setChatWallpapers((current) => ({ ...current, [chatId]: wallpaperId }));
  }

  function clearChatWallpaper(chatId: string) {
    setChatWallpapers((current) => {
      const next = { ...current };
      delete next[chatId];
      return next;
    });
  }

  const screens: AppScreens = {
    chatList: (variant) => (
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={selectChat}
        onOpenNewChat={() => setShowNewChat(true)}
        variant={variant}
      />
    ),

    newChatPicker: () => (
      <NewChatPicker
        contacts={contacts}
        onCancel={() => setShowNewChat(false)}
        onSelectContact={selectNewContact}
      />
    ),

    conversation: (chat, showBack) => (
      <Conversation
        chat={chat}
        contact={chat.contactId ? getContact(chat.contactId) : undefined}
        wallpaperId={resolveWallpaperId(chat.id)}
        showBack={showBack}
        onBack={() => setSelectedChatId(null)}
        onOpenInfo={openInfo}
        onStartCall={() => setActiveCallChatId(chat.id)}
      />
    ),

    contactInfo: (chat, variant) => {
      const contact = chat.contactId ? getContact(chat.contactId) : undefined;
      if (!contact) return null;
      return (
        <ContactProfile
          contact={contact}
          variant={variant}
          wallpaperLabel={getWallpaperLabel(resolveWallpaperId(chat.id))}
          onBack={() => setDetailPanel("none")}
          onMessage={() => setDetailPanel("none")}
          onCall={() => setActiveCallChatId(chat.id)}
          onOpenWallpaper={() => setDetailPanel("wallpaper")}
        />
      );
    },

    groupInfo: (chat, variant) => (
      <GroupInfo
        chat={chat}
        members={(chat.memberIds ?? []).map(getContact).filter((m) => m !== undefined)}
        variant={variant}
        wallpaperLabel={getWallpaperLabel(resolveWallpaperId(chat.id))}
        onBack={() => setDetailPanel("none")}
        onOpenWallpaper={() => setDetailPanel("wallpaper")}
      />
    ),

    settings: (variant) => (
      <Settings
        variant={variant}
        activeSection={settingsSection === "root" ? null : settingsSection}
        darkMode={theme === "dark"}
        onToggleDarkMode={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        onOpenPrivacy={() => setSettingsSection("privacy")}
        onOpenWallpaper={() => setSettingsSection("wallpaper")}
      />
    ),

    privacy: (variant) => (
      <Privacy
        variant={variant}
        readReceipts={readReceipts}
        onToggleReadReceipts={() => setReadReceipts((r) => !r)}
        onBack={() => setSettingsSection("root")}
      />
    ),

    defaultWallpaperPicker: (showBack) => (
      <WallpaperPicker
        title="Chat wallpaper"
        hint="Used by every chat that has no wallpaper of its own."
        selectedId={defaultWallpaperId}
        showBack={showBack}
        onSelect={setDefaultWallpaperId}
        onBack={() => setSettingsSection("root")}
      />
    ),

    chatWallpaperPicker: (chat) => (
      <WallpaperPicker
        title={chat.name}
        hint="Pick a wallpaper for this chat only."
        selectedId={resolveWallpaperId(chat.id)}
        showBack
        onSelect={(wallpaperId) => selectChatWallpaper(chat.id, wallpaperId)}
        onBack={openInfo}
        onResetToDefault={chatWallpapers[chat.id] ? () => clearChatWallpaper(chat.id) : undefined}
      />
    ),

    call: (variant) => {
      const callChat = activeCallChatId ? getChat(activeCallChatId) : undefined;
      if (!callChat) return null;
      return (
        <CallScreen chat={callChat} variant={variant} onEndCall={() => setActiveCallChatId(null)} />
      );
    },
  };

  return {
    activeTab,
    selectedChat,
    detailPanel,
    showNewChat,
    settingsSection,
    changeTab,
    screens,
  };
}
