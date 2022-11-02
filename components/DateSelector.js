import { TimeScale } from "chart.js";
import React from "react";
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';

//DELETE this component and just use the DayPicker??
export default class ForecastDateSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            toDate:"",
        }
    }

    componentDidMount(){
        this.setState({
            date: new Date(),
            toDate: new Date(),
        })
    }

    handleSelect = async (date) => {
        this.setState({ date })
        this.props.onDateChange(date);
    }

    render() {
        const { date, toDate } = this.state;
        return (
            <DayPicker
                mode="single"
                toDate={toDate}
                selected={date}
                onSelect={this.handleSelect}
            />
        )
    }
}