import { Clock, Phone as PhoneIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { AppState } from '../hooks/useAppState';
import TabBar from '../components/primitives/TabBar';
import EmptyState from '../screens/EmptyState';
import styles from './MobileLayout.module.css';

type MobileLayoutProps = AppState;

export default function MobileLayout({
  activeTab,
  selectedChat,
  detailPanel,
  showNewChat,
  settingsSection,
  changeTab,
  screens,
}: MobileLayoutProps) {
  const call = screens.call('mobile');
  if (call) return call;

  let screen: ReactNode;
  let showTabBar = false;

  if (showNewChat) {
    screen = screens.newChatPicker();
  } else if (detailPanel === 'wallpaper' && selectedChat) {
    screen = screens.chatWallpaperPicker(selectedChat);
  } else if (detailPanel === 'contact' && selectedChat?.contactId) {
    screen = screens.contactInfo(selectedChat, 'mobile');
  } else if (detailPanel === 'group' && selectedChat) {
    screen = screens.groupInfo(selectedChat, 'mobile');
  } else if (activeTab === 'settings' && settingsSection === 'privacy') {
    screen = screens.privacy('mobile');
  } else if (activeTab === 'settings' && settingsSection === 'wallpaper') {
    screen = screens.defaultWallpaperPicker(true);
  } else if (activeTab === 'settings') {
    showTabBar = true;
    screen = screens.settings('mobile');
  } else if (activeTab === 'chats' && selectedChat) {
    screen = screens.conversation(selectedChat, true);
  } else if (activeTab === 'chats') {
    showTabBar = true;
    screen = screens.chatList('mobile');
  } else if (activeTab === 'status') {
    showTabBar = true;
    screen = <EmptyState icon={<Clock size={64} strokeWidth={1.5} />} title="No status updates yet" />;
  } else {
    showTabBar = true;
    screen = <EmptyState icon={<PhoneIcon size={64} strokeWidth={1.5} />} title="No recent calls" />;
  }

  return (
    <div className={styles.frame}>
      <div className={styles.screen}>{screen}</div>
      {showTabBar && <TabBar active={activeTab} onChange={changeTab} />}
    </div>
  );
}
