import { ChevronLeft, Check } from 'lucide-react';
import type { WallpaperId } from '@jchat/shared';
import IconButton from '../components/primitives/IconButton';
import { WALLPAPERS } from '../data/wallpapers';
import styles from './WallpaperPicker.module.css';

interface WallpaperPickerProps {
  title: string;
  hint: string;
  selectedId: WallpaperId;
  showBack: boolean;
  onSelect: (id: WallpaperId) => void;
  onBack: () => void;
  onResetToDefault?: () => void;
}

export default function WallpaperPicker({
  title,
  hint,
  selectedId,
  showBack,
  onSelect,
  onBack,
  onResetToDefault,
}: WallpaperPickerProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        {showBack && (
          <IconButton icon={<ChevronLeft size={18} strokeWidth={2.2} />} variant="ghost" size={32} label="Back" onClick={onBack} />
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>

      <p className={styles.hint}>{hint}</p>

      <div className={styles.grid}>
        {WALLPAPERS.map((wallpaper) => (
          <button
            key={wallpaper.id}
            type="button"
            className={`${styles.option} ${wallpaper.id === selectedId ? styles.optionSelected : ''}`}
            onClick={() => onSelect(wallpaper.id)}
            aria-pressed={wallpaper.id === selectedId}
          >
            <span className={styles.swatch} data-wallpaper={wallpaper.id}>
              <span className={styles.bubbleIn} />
              <span className={styles.bubbleOut} />
              {wallpaper.id === selectedId && (
                <span className={styles.check}>
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
            </span>
            <span className={styles.label}>{wallpaper.label}</span>
          </button>
        ))}
      </div>

      {onResetToDefault && (
        <button type="button" className={styles.reset} onClick={onResetToDefault}>
          Use the default wallpaper
        </button>
      )}
    </div>
  );
}
