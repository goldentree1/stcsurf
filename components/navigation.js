import styles from './navigation.module.css';
export default function Navigation() {
  //change nav items to Link
  return (
    <header className={styles.container}>
      <div>
        Swell-Forecast-2
      </div>
      <nav>
        <a>Forecasts</a>
        <a>Photos</a>
        <a>Videos</a>
        <a>Contact</a>
      </nav>
    </header>
  )
}
