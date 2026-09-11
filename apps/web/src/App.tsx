import { useAppState } from './hooks/useAppState';
import { useMediaQuery } from './hooks/useMediaQuery';
import DesktopLayout from './layouts/DesktopLayout';
import MobileLayout from './layouts/MobileLayout';
import styles from './App.module.css';

const DESKTOP_QUERY = '(min-width: 900px)';

export default function App() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const app = useAppState();

  return (
    <div className={styles.app}>
      {isDesktop ? <DesktopLayout {...app} /> : <MobileLayout {...app} />}
    </div>
  );
}
