import type { CSSProperties, ReactNode } from 'react';
import styles from './IconButton.module.css';

type Variant = 'default' | 'accent' | 'ghost' | 'dark' | 'danger';

interface IconButtonProps {
  icon: ReactNode;
  size?: number;
  radius?: number;
  variant?: Variant;
  label?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

export default function IconButton({
  icon,
  size = 36,
  radius,
  variant = 'default',
  label,
  onClick,
  style,
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]}`}
      style={{ width: size, height: size, borderRadius: radius ?? Math.round(size / 3), ...style }}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );
}
