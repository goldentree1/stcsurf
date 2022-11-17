import React from 'react'
import Link from 'next/link';
import styles from './navigation.module.css';
import Hamburger from './Hamburger'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navExpanded: false,
    }
  }

  handleHamburgerClick = () => {
    this.setState({
      navExpanded: !this.state.navExpanded
    })
  }

  render() {
    return (
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>
            EB-SWELL
          </a>
        </Link>
        <Hamburger onClick={this.handleHamburgerClick}
          className={styles.navToggle}
          ariaControls="primary-nav" />
        <nav>
          <ul id="primary-nav"
            className={styles.nav}
            data-visible={this.state.navExpanded}>
            <li>
              <a>Forecasts</a>
            </li>
            <li>
              <a>My Alerts</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
            <li>
              <a>Login</a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}
