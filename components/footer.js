import styles from './footer.module.css';

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <h2>
          EB-SWELL-FORECAST-2
        </h2>
        <div>
          Swell-forecast-2
        </div>
        <nav>
          Link 1 Link 2 Link 3
        </nav>
        <div style={{height:'100vh'}}></div>
      </footer>
    </>
  )
}
