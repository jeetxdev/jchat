import type { Chat } from '@jchat/shared';
import Avatar from './Avatar';
import styles from './ChatRow.module.css';

interface ChatRowProps {
  chat: Chat;
  active?: boolean;
  onClick?: () => void;
}

export default function ChatRow({ chat, active, onClick }: ChatRowProps) {
  return (
    <button
      type="button"
      className={`${styles.row} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      <Avatar initials={chat.initials} color={chat.color} size={52} />
      <div className={styles.body}>
        <div className={styles.top}>
          <strong className={styles.name}>{chat.name}</strong>
          <span className={styles.time}>{chat.time}</span>
        </div>
        <div className={styles.preview}>
          {chat.previewAuthor && <strong className={styles.previewAuthor}>{chat.previewAuthor}:</strong>}{' '}
          {chat.preview}
        </div>
      </div>
      {!!chat.unread && <span className={styles.badge}>{chat.unread}</span>}
    </button>
  );
}
