import type { CSSProperties } from 'react';
import type { AvatarColor } from '@jchat/shared';
import styles from './Avatar.module.css';

const COLOR_VARS: Record<AvatarColor, string> = {
  blue: 'var(--accent)',
  amber: 'var(--warning)',
  green: 'var(--success)',
  red: 'var(--danger)',
};

interface AvatarProps {
  initials: string;
  color: AvatarColor;
  size: number;
}

export default function Avatar({ initials, color, size }: AvatarProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: Math.round(size / 3.3),
    background: COLOR_VARS[color],
    fontSize: Math.round(size * 0.32),
  };
  return (
    <div className={styles.avatar} style={style}>
      {initials}
    </div>
  );
}
