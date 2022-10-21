import React from 'react';
import { Chart as ChartJS, CategoryScale, Filler, LinearScale, BarElement, Tooltip, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {WeekdayLabels} from './WeekdayLabels'

ChartJS.register(WeekdayLabels, CategoryScale, LinearScale, BarElement, Filler, Tooltip, PointElement, LineElement);

export default class WindChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <Line
                data={constructData(data)}
                width={400}
                height={100}
                options={constructOptions(data)}
            />
        )
    }
}

//Helpers
function constructOptions(data) {
    const { time } = data;
    return{
       layout:{
            padding:{
                top: 50,
            }
       },
        plugins: {
            weekdaylabels: {
                dates: time.data,
                position: 'top'
            }
        },
        scales: {
            x: {
                position: 'top',
                grid: { display: false, }
    
            },
            y: {
                title: {
                    display: true,
                    text: "Speed (m/s)"
                },
                beginAtZero: true,
                grid: { display: false, },
            },
            y1: {
                title: {
                    display: true,
                    text: "Speed (m/s)"
                },
                beginAtZero: true,
                grid: { display: false, },
                display: true,
                position: 'right'
            },
            y2:{
                display: false,
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    }
}

function constructData(data) {
    const { wind10m, windGust10m, windDir10m, time } = data;
    const labels = time.data.map((UTCString) => {
        return new Date(UTCString).getHours()
    })
    return {
        labels,
        datasets: [{
            label: 'Wind',
            data: wind10m,
            fill: true,
            backgroundColor: 'rgba(96, 119, 234, 0.5)',
            borderColor: 'rgb(96, 119, 234)',
            borderWidth: 4
        },
        {
            label: 'Gusts',
            data: windGust10m,
            borderColor: '#D1CFE2',
            borderWidth: 4,
            yAxisID: 'y1'
        },
        {
            label: 'Direction',
            data: windDir10m,
            borderWidth: 4,
            yAxisID: 'y2'
        }]
    }
}
