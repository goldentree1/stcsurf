import React from "react";
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import modifierStyles from './DateSelector.module.css';

export default class ForecastDateSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentDidMount(){
        this.setState({date: new Date()});
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
                toDate={new Date()}
                selected={date}
                onSelect={this.handleSelect}
                modifiersClassNames={modifierStyles}
            />
        )
    }
}
