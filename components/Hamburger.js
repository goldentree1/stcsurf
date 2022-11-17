import React from "react";
import styles from './Hamburger.module.css';
export default class Hamburger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ariaExpanded: false
        }
    }
    handleClick = () => {
        this.props.onClick();
        this.setState({
            ariaExpanded: !this.state.ariaExpanded
        });
    }
    render() {
        return (
            <button onClick={this.handleClick}
                className={`${styles.hamburger} ${this.props.className}`}
                aria-expanded={this.state.ariaExpanded}
                aria-controls={this.props.ariaControls}>
                <span className={styles.screenReaderOnly}>Menu</span>
                <svg fill="none" stroke="var(--hamburger-color)" viewBox="0 0 100 100" width="60">
                    <path d="m 10 40 h 80 a 13 13 0 0 1 0 23 h -80 a 20 20 0 0 0 0 23 a 42 42 0 0 0 63 -11 a 49 49 0 0 0 -1 -57 a 22 22 0 0 0 -30 1 v 80"></path>
                </svg>
            </button>
        )
    }
}