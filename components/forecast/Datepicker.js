import React from "react";
import { getForecast } from "../../utils/forecast";

//IDEA: change this class to 'ForecastChanger', and make a separate Datepicker component for OOP sakes? Or not worth it?
export default class Datepicker extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDateChange = () => {
        const data1 = {
            forecast: {
                data: {
                    swellHeight: 10.2
                }
            }
        } //THIS WORKS (ie updates) if used like 'onDateChange(data1)'
        
        
        //TODO: STILL NEED TO GET DATE from datepicker
        const date = new Date();
        const {id, onDateChange} = this.props;
        const data = getForecast(id, date); //and sort this func. out


        onDateChange(data);
    }

    render() {
        return (
            <button onClick={this.handleDateChange}>
                Datepicker
            </button>
        )
    }
}