import dynamic from 'next/dynamic';
import styles from './page.module.css';

// Dynamically import the map to avoid SSR issues with window/document
const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Loading Interactive Map...</div>,
});

export default function Home() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.shield}>🛡️</span> SafeRoute AI
        </div>
        <div className={styles.tagline}>
          Prioritizing your safety over speed.
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.inputGroup}>
            <label>Origin</label>
            <input type="text" placeholder="Enter starting point..." />
          </div>
          <div className={styles.inputGroup}>
            <label>Destination</label>
            <input type="text" placeholder="Enter destination..." />
          </div>
          <button className={styles.routeBtn}>Find Safe Route</button>
        </div>
      </aside>

      <main className={styles.mapContainer}>
        <Map />
      </main>
    </div>
  );
}
