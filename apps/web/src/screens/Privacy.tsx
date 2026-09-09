import { ChevronLeft } from 'lucide-react';
import IconButton from '../components/primitives/IconButton';
import styles from './Privacy.module.css';

interface PrivacyProps {
  variant: 'mobile' | 'desktop';
  readReceipts: boolean;
  onToggleReadReceipts: () => void;
  onBack: () => void;
}

export default function Privacy({ variant, readReceipts, onToggleReadReceipts, onBack }: PrivacyProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        {variant === 'mobile' && (
          <IconButton icon={<ChevronLeft size={18} strokeWidth={2.2} />} variant="ghost" size={32} label="Back" onClick={onBack} />
        )}
        <h1 className={styles.title}>Privacy</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.row}>
          <span>Last seen &amp; online</span>
          <span className={styles.value}>Everyone</span>
        </div>
        <div className={styles.row}>
          <span>Profile photo</span>
          <span className={styles.value}>Contacts</span>
        </div>
        <div className={styles.row}>
          <span>Read receipts</span>
          <button
            type="button"
            className={`${styles.toggle} ${readReceipts ? styles.toggleOn : ''}`}
            onClick={onToggleReadReceipts}
            aria-label="Toggle read receipts"
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>
      </div>
    </div>
  );
}
