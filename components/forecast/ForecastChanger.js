import React from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class ForecastChanger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    handleDateChange = async (date) => {
        const { id, onDateChange } = this.props;
        const res = await axios.post("/api/forecast", {
            id,
            date: new Date(date).setHours(23, 59, 59, 999) 
        });
        this.setState({ date });
        onDateChange(res.data);
    }

    render() {
        const { date } = this.state;
        return (
            <DatePicker
                selected={date}
                onChange={this.handleDateChange}
            />
        )
    }
}