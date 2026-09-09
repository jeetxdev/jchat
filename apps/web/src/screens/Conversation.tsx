import { ChevronLeft, Phone, Video, Pin, Paperclip, Send } from 'lucide-react';
import type { Chat, Contact } from '@jchat/shared';
import Avatar from '../components/primitives/Avatar';
import IconButton from '../components/primitives/IconButton';
import MessageBubble from '../components/primitives/MessageBubble';
import styles from './Conversation.module.css';

interface ConversationProps {
  chat: Chat;
  contact?: Contact;
  showBack: boolean;
  onBack: () => void;
  onOpenInfo: () => void;
  onStartCall: () => void;
}

export default function Conversation({ chat, contact, showBack, onBack, onOpenInfo, onStartCall }: ConversationProps) {
  const pinnedMessage = chat.messages.find((m) => m.id === chat.pinnedMessageId);
  const pinnedText = pinnedMessage?.text ?? pinnedMessage?.image?.caption;

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        {showBack && (
          <IconButton
            icon={<ChevronLeft size={18} strokeWidth={2.2} />}
            variant="ghost"
            size={32}
            label="Back"
            onClick={onBack}
          />
        )}
        <button type="button" className={styles.identity} onClick={onOpenInfo} aria-label={`View ${chat.kind === 'group' ? 'group' : 'contact'} info`}>
          <Avatar initials={chat.initials} color={chat.color} size={38} />
          <div>
            <div className={styles.name}>{chat.name}</div>
            <div className={chat.kind === 'dm' && contact?.online ? styles.online : styles.subStatus}>
              {chat.kind === 'group' ? `${chat.memberCount ?? chat.memberIds?.length ?? 0} members` : contact?.online ? 'online' : 'offline'}
            </div>
          </div>
        </button>
        <IconButton icon={<Phone size={16} strokeWidth={2} />} size={32} label="Call" onClick={onStartCall} />
        <IconButton icon={<Video size={16} strokeWidth={2} />} size={32} label="Video call" onClick={onStartCall} />
      </div>

      {pinnedMessage && (
        <div className={styles.pinnedBar}>
          <Pin size={14} strokeWidth={2} />
          <span className={styles.pinnedText}>Pinned: {pinnedText}</span>
          <span className={styles.pinnedCount}>1/1</span>
        </div>
      )}

      <div className={styles.messages}>
        <div className={styles.dateChip}>TODAY</div>
        {chat.messages.map((message) => (
          <MessageBubble key={message.id} message={message} outgoing={message.authorId === 'me'} />
        ))}
      </div>

      <div className={styles.composer}>
        <IconButton icon={<Paperclip size={18} strokeWidth={2} />} label="Attach" />
        <div className={styles.input}>
          <input type="text" placeholder="Message" aria-label="Message" />
        </div>
        <IconButton icon={<Send size={17} strokeWidth={2.4} />} variant="accent" radius={14} label="Send" />
      </div>
    </div>
  );
}
