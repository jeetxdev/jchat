import { MessageCircle, Clock, Phone, Settings as SettingsIcon } from "lucide-react";

export type Tab = "chats" | "status" | "calls" | "settings";

export const TABS: { id: Tab; label: string; icon: typeof MessageCircle }[] = [
  { id: "chats", label: "Chats", icon: MessageCircle },
  { id: "status", label: "Status", icon: Clock },
  { id: "calls", label: "Calls", icon: Phone },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];
