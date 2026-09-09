import { useEffect, useState } from 'react';
import { Mic, MicOff, Volume2, Video, PhoneOff } from 'lucide-react';
import type { Chat } from '@jchat/shared';
import Avatar from '../components/primitives/Avatar';
import styles from './CallScreen.module.css';

interface CallScreenProps {
  chat: Chat;
  variant: 'mobile' | 'desktop';
  onEndCall: () => void;
}

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function CallScreen({ chat, variant, onEndCall }: CallScreenProps) {
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const avatarSize = variant === 'mobile' ? 120 : 160;
  const controlSize = variant === 'mobile' ? 52 : 60;

  return (
    <div className={styles.screen}>
      <div className={styles.center}>
        <Avatar initials={chat.initials} color={chat.color} size={avatarSize} />
        <div className={styles.name} style={{ fontSize: variant === 'mobile' ? 22 : 28 }}>
          {chat.name}
        </div>
        <div className={styles.meta}>{formatDuration(elapsed)} · voice call</div>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.controlGroup}>
          <button type="button" className={styles.controlTile} style={{ width: controlSize, height: controlSize }} onClick={() => setMuted((m) => !m)}>
            {muted ? <MicOff size={20} strokeWidth={2} /> : <Mic size={20} strokeWidth={2} />}
          </button>
          <span className={styles.controlLabel}>{muted ? 'Muted' : 'Mute'}</span>
        </div>
        <div className={styles.controlGroup}>
          <button type="button" className={styles.controlTile} style={{ width: controlSize, height: controlSize }}>
            <Volume2 size={20} strokeWidth={2} />
          </button>
          <span className={styles.controlLabel}>Speaker</span>
        </div>
        <div className={styles.controlGroup}>
          <button type="button" className={styles.controlTile} style={{ width: controlSize, height: controlSize }}>
            <Video size={20} strokeWidth={2} />
          </button>
          <span className={styles.controlLabel}>Video</span>
        </div>
        <div className={styles.controlGroup}>
          <button
            type="button"
            className={`${styles.controlTile} ${styles.endCall}`}
            style={{ width: controlSize, height: controlSize }}
            onClick={onEndCall}
            aria-label="End call"
          >
            <PhoneOff size={22} strokeWidth={2} />
          </button>
          <span className={styles.controlLabel}>End</span>
        </div>
      </div>
    </div>
  );
}
