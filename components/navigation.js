export default function Navigation() {
  //change
  return (
    <header className="pb-5">
      <div className="text-center rounded-0 alert-dark d-flex justify-content-center align-items-center" role="alert">
        <a href="#" className="">Matanaka + 3 other spots </a>&nbsp;may be good today!
        <button type="button" className="btn-close ms-3" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div className="container d-flex justify-content-between align-items-center">
        <div className="h4">
          EB-Swell-Forecast-2
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