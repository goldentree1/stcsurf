export default function Navigation() {
  //change
  return (
    <header className="pb-5">
      <div className="text-center rounded-0" role="alert">
        <a href="#" className="alert-link">Matanaka + 3 other spots</a> may be good today!
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div className="container d-flex justify-content-between align-items-center">
        <div className="h4">
          Swell-Forecast-2
        </div>
        <nav className="d-flex" style={{gap:'1.75rem'}}>
          <a>Forecasts</a>
          <a>My Surf Spots</a>
          <a>Login</a>
          <a>Contact</a>
        </nav>
      </div>

    </header>
  )
}