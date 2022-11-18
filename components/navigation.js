import React from 'react'
import Link from 'next/link';
import styles from './navigation.module.css';
import Hamburger from './Hamburger'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileNavExpanded: false,
      mobileNavVisible: true,
      prevScroll: 0,
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { mobileNavExpanded, prevScroll } = this.state;
    this.setState({
      mobileNavVisible: mobileNavExpanded || window.scrollY < 30 ?
        true : prevScroll > window.scrollY,
      prevScroll: window.scrollY
    })
  }

  handleHamburgerClick = () => {
    this.setState({
      mobileNavExpanded: !this.state.mobileNavExpanded
    })
  }

  render() {
    return (
      <header className={styles.header}
        data-visible={this.state.mobileNavVisible}>
        <Link href="/">
          <a className={styles.logo}>
            EB-SWELL
          </a>
        </Link>
        <Hamburger onClick={this.handleHamburgerClick}
          className={styles.hamburger}
          ariaControls="primary-nav" />
        <nav>
          <ul id="primary-nav"
            className={styles.nav}
            data-visible={this.state.mobileNavExpanded}>
            <li>
              <a>Forecasts</a>
            </li>
            <li>
              <a>My Waves</a>
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
