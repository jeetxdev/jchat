import { ChevronLeft, MessageCircle, Phone, Video, BellOff, Image as ImageIcon } from 'lucide-react';
import type { Contact } from '@jchat/shared';
import Avatar from '../components/primitives/Avatar';
import IconButton from '../components/primitives/IconButton';
import Pill from '../components/primitives/Pill';
import SectionLabel from '../components/primitives/SectionLabel';
import styles from './ContactProfile.module.css';

interface ContactProfileProps {
  contact: Contact;
  variant: 'mobile' | 'panel';
  wallpaperLabel: string;
  onBack: () => void;
  onMessage: () => void;
  onCall: () => void;
  onOpenWallpaper: () => void;
}

export default function ContactProfile({ contact, variant, wallpaperLabel, onBack, onMessage, onCall, onOpenWallpaper }: ContactProfileProps) {
  const avatarSize = variant === 'mobile' ? 100 : 96;

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        {variant === 'mobile' ? (
          <IconButton icon={<ChevronLeft size={18} strokeWidth={2.2} />} variant="ghost" size={32} label="Back" onClick={onBack} />
        ) : (
          <span className={styles.panelTitle}>Contact info</span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.identity}>
          <Avatar initials={contact.initials} color={contact.color} size={avatarSize} />
          <div className={styles.name}>{contact.name}</div>
          <div className={styles.phone}>{contact.phone}</div>
          {variant === 'mobile' && <Pill variant="neutral">{contact.role}</Pill>}
        </div>

        {variant === 'mobile' && (
          <div className={styles.actions}>
            <button type="button" className={styles.actionTile} onClick={onMessage}>
              <MessageCircle size={18} strokeWidth={2} />
              <span>Message</span>
            </button>
            <button type="button" className={styles.actionTile} onClick={onCall}>
              <Phone size={18} strokeWidth={2} />
              <span>Call</span>
            </button>
            <button type="button" className={styles.actionTile} onClick={onCall}>
              <Video size={18} strokeWidth={2} />
              <span>Video</span>
            </button>
            <button type="button" className={styles.actionTile}>
              <BellOff size={18} strokeWidth={2} />
              <span>Mute</span>
            </button>
          </div>
        )}

        <div className={styles.about}>
          <SectionLabel variant="accent">About</SectionLabel>
          <p>{contact.about}</p>
        </div>

        <div className={styles.rows}>
          <button type="button" className={styles.rowButton} onClick={onOpenWallpaper}>
            <ImageIcon size={16} strokeWidth={2} />
            <span className={styles.rowLabel}>Chat wallpaper</span>
            <span className={styles.rowMeta}>{wallpaperLabel} ›</span>
          </button>

          {variant === 'mobile' && (
            <>
              <div className={styles.row}>
                <span>Media, links &amp; docs</span>
                <span className={styles.rowMeta}>128 ›</span>
              </div>
              <div className={`${styles.row} ${styles.danger}`}>
                <span>Block contact</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
