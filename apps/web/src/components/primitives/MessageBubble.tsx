import { CheckCheck, Image as ImageIcon, Heart } from "lucide-react";
import type { Message } from "@jchat/shared";
import styles from "./MessageBubble.module.css";

interface MessageBubbleProps {
  message: Message;
  outgoing: boolean;
}

export default function MessageBubble({ message, outgoing }: MessageBubbleProps) {
  const alignClass = outgoing ? styles.outgoing : styles.incoming;

  if (message.image) {
    return (
      <div className={`${styles.bubble} ${styles.imageBubble} ${alignClass}`}>
        <div className={styles.thumb}>
          <ImageIcon size={28} strokeWidth={1.6} />
        </div>
        <div className={styles.caption}>{message.image.caption}</div>
        <div className={styles.time}>{message.time}</div>
        <div className={styles.reactions}>
          <span className={styles.reaction}>
            <Heart size={11} fill="var(--danger)" stroke="none" /> {message.image.heartCount}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.bubble} ${alignClass}`}>
      {message.text}
      <div className={styles.meta}>
        {message.time}
        {outgoing && message.read && <CheckCheck size={14} strokeWidth={2.5} />}
      </div>
    </div>
  );
}
