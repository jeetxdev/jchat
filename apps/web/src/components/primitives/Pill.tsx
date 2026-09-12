import type { ReactNode } from "react";
import styles from "./Pill.module.css";

type Variant = "active" | "inactive" | "tint" | "neutral";

interface PillProps {
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
}

export default function Pill({ children, variant = "inactive", onClick }: PillProps) {
  const className = `${styles.pill} ${styles[variant]}`;
  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {children}
      </button>
    );
  }
  return <span className={className}>{children}</span>;
}
