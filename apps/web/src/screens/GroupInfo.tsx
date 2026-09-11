import { ChevronLeft, BellOff, Search, Image as ImageIcon } from "lucide-react";
import type { Chat, Contact } from "@jchat/shared";
import Avatar from "../components/primitives/Avatar";
import IconButton from "../components/primitives/IconButton";
import Pill from "../components/primitives/Pill";
import SectionLabel from "../components/primitives/SectionLabel";
import styles from "./GroupInfo.module.css";

interface GroupInfoProps {
  chat: Chat;
  members: Contact[];
  variant: "mobile" | "panel";
  onBack: () => void;
}

export default function GroupInfo({ chat, members, variant, onBack }: GroupInfoProps) {
  const avatarSize = variant === "mobile" ? 88 : 88;
  const memberCount = chat.memberCount ?? members.length;

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        {variant === "mobile" ? (
          <>
            <IconButton
              icon={<ChevronLeft size={18} strokeWidth={2.2} />}
              variant="ghost"
              size={32}
              label="Back"
              onClick={onBack}
            />
            <span className={styles.headerTitle}>Group info</span>
          </>
        ) : (
          <span className={styles.panelTitle}>Group info</span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.identity}>
          <Avatar initials={chat.initials} color={chat.color} size={avatarSize} />
          <div className={styles.name}>{chat.name}</div>
          <div className={styles.meta}>Group · {memberCount} members</div>
        </div>

        {variant === "mobile" && (
          <div className={styles.actions}>
            <button type="button" className={styles.actionTile}>
              <BellOff size={18} strokeWidth={2} />
              <span>Mute</span>
            </button>
            <button type="button" className={styles.actionTile}>
              <Search size={18} strokeWidth={2} />
              <span>Search</span>
            </button>
            <button type="button" className={styles.actionTile}>
              <ImageIcon size={18} strokeWidth={2} />
              <span>Media</span>
            </button>
          </div>
        )}

        {variant === "mobile" && chat.description && (
          <p className={styles.description}>{chat.description}</p>
        )}

        <div className={styles.sectionLabel}>
          <SectionLabel variant="accent">{memberCount} members</SectionLabel>
        </div>

        {members.map((member) => (
          <div key={member.id} className={styles.memberRow}>
            <Avatar initials={member.initials} color={member.color} size={40} />
            <span className={styles.memberName}>{member.name}</span>
            {chat.adminIds?.includes(member.id) && <Pill variant="tint">Admin</Pill>}
          </div>
        ))}
      </div>
    </div>
  );
}
