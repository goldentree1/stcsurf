import { TimeScale } from "chart.js";
import React from "react";
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default class ForecastDateSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentDidUpdate(prevProps, prevState){

    }

    handleSelect = async (date) => {
        this.setState({ date })
        this.props.onDateChange(date);
    }

    render() {
        const { date } = this.state;
        return (
            <DayPicker
                mode="single"
                selected={date}
                onSelect={this.handleSelect}
            />
        )
    }
}