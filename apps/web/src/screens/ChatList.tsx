import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import type { Chat } from "@jchat/shared";
import ChatRow from "../components/primitives/ChatRow";
import Pill from "../components/primitives/Pill";
import IconButton from "../components/primitives/IconButton";
import styles from "./ChatList.module.css";

type Filter = "all" | "unread" | "groups";

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
  onOpenNewChat: () => void;
  variant: "mobile" | "sidebar";
}

export default function ChatList({
  chats,
  selectedChatId,
  onSelectChat,
  onOpenNewChat,
  variant,
}: ChatListProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const unreadCount = chats.filter((c) => c.unread).length;

  const visibleChats = useMemo(() => {
    if (filter === "unread") return chats.filter((c) => c.unread);
    if (filter === "groups") return chats.filter((c) => c.kind === "group");
    return chats;
  }, [chats, filter]);

  return (
    <div className={styles.screen}>
      <div className={variant === "mobile" ? styles.headerMobile : styles.headerSidebar}>
        {variant === "mobile" ? (
          <>
            <h1 className={styles.title}>Chats</h1>
            <div className={styles.headerActions}>
              <IconButton icon={<Search size={17} strokeWidth={2} />} label="Search" />
              <IconButton
                icon={<Plus size={17} strokeWidth={2.2} />}
                variant="accent"
                label="New chat"
                onClick={onOpenNewChat}
              />
            </div>
          </>
        ) : (
          <>
            <span className={styles.wordmark}>jchat</span>
            <IconButton
              icon={<Plus size={16} strokeWidth={2.2} />}
              variant="accent"
              size={32}
              label="New chat"
              onClick={onOpenNewChat}
            />
          </>
        )}
      </div>

      <div className={styles.filters}>
        <Pill variant={filter === "all" ? "active" : "inactive"} onClick={() => setFilter("all")}>
          All
        </Pill>
        <Pill
          variant={filter === "unread" ? "active" : "inactive"}
          onClick={() => setFilter("unread")}
        >
          Unread · {unreadCount}
        </Pill>
        <Pill
          variant={filter === "groups" ? "active" : "inactive"}
          onClick={() => setFilter("groups")}
        >
          Groups
        </Pill>
      </div>

      <div className={styles.list}>
        {visibleChats.map((chat) => (
          <ChatRow
            key={chat.id}
            chat={chat}
            active={variant === "sidebar" && chat.id === selectedChatId}
            onClick={() => onSelectChat(chat.id)}
          />
        ))}
      </div>
    </div>
  );
}
