import { Search, Users, UserPlus } from "lucide-react";
import type { Contact } from "@jchat/shared";
import Avatar from "../components/primitives/Avatar";
import SectionLabel from "../components/primitives/SectionLabel";
import styles from "./NewChatPicker.module.css";

interface NewChatPickerProps {
  contacts: Contact[];
  onCancel: () => void;
  onSelectContact: (id: string) => void;
}

export default function NewChatPicker({ contacts, onCancel, onSelectContact }: NewChatPickerProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <span className={styles.title}>New chat</span>
        <button type="button" className={styles.cancel} onClick={onCancel}>
          Cancel
        </button>
      </div>

      <div className={styles.searchWrap}>
        <div className={styles.search}>
          <Search size={15} strokeWidth={2} color="var(--text-faint)" />
          <span>Search contacts</span>
        </div>
      </div>

      <div className={styles.list}>
        <button type="button" className={styles.actionRow}>
          <div className={styles.actionIcon}>
            <Users size={18} strokeWidth={2} />
          </div>
          <strong>New group</strong>
        </button>
        <button type="button" className={styles.actionRow}>
          <div className={styles.actionIcon}>
            <UserPlus size={18} strokeWidth={2} />
          </div>
          <strong>New contact</strong>
        </button>

        <div className={styles.sectionLabel}>
          <SectionLabel>Contacts on jchat</SectionLabel>
        </div>

        {contacts.map((contact) => (
          <button
            key={contact.id}
            type="button"
            className={styles.contactRow}
            onClick={() => onSelectContact(contact.id)}
          >
            <Avatar initials={contact.initials} color={contact.color} size={40} />
            <span>{contact.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
