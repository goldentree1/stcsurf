import React from "react";
import styles from './NavToggler.module.css';
export default class NavToggler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ariaExpanded: false
        }
    }
    handleClick = () => {
        this.setState({
            ariaExpanded: !this.state.ariaExpanded
        })
    }
    render() {
        return (
            <button onClick={this.handleClick}
                className={styles.hamburger}
                aria-expanded={this.state.ariaExpanded}>
                <svg fill="none" stroke="black" viewBox="0 0 100 100" width="60">
                    <path d="m 10 40 h 80 a 13 13 0 0 1 0 23 h -80 a 20 20 0 0 0 0 23 a 42 42 0 0 0 63 -11 a 49 49 0 0 0 -1 -57 a 22 22 0 0 0 -30 1 v 80"
                        stroke-linecap="round" stroke-linejoin="round">
                    </path>
                </svg>
            </button>
        )
    }
}