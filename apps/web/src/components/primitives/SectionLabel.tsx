import type { ReactNode } from 'react';
import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  children: ReactNode;
  variant?: 'muted' | 'accent';
}

export default function SectionLabel({ children, variant = 'muted' }: SectionLabelProps) {
  return <div className={`${styles.label} ${styles[variant]}`}>{children}</div>;
}
