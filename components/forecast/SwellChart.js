import React from 'react';
import { Chart as ChartJS, CategoryScale, Filler, LinearScale, BarElement, Tooltip, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { WeekdayLabels } from './WeekdayLabels'
import annotationPlugin from 'chartjs-plugin-annotation';
import constructDirectionArrowAnnotations from './DirectionArrows';

ChartJS.register(annotationPlugin, WeekdayLabels, CategoryScale, LinearScale, BarElement, Filler, Tooltip, PointElement, LineElement);

export default class SwellChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <Line
                data={constructData(data)}
                width={400}
                height={170}
                options={constructOptions(data)}
            />
        )
    }
}


//Helpers
function constructOptions(data) {
    const { swell, direction, time } = data;
    const annotations = {
        ...constructDirectionArrowAnnotations(swell, direction)
    }
    return {
        layout: {
            padding: {
                bottom: 30,
            }
        },
        plugins: {
            weekdaylabels: {
                dates: time.data
            },
            annotation: {
                annotations
            }
        },
        scales: {
            x: {
                position: 'bottom',
                grid: { display: false, }

            },
            y: {
                title: {
                    display: true,
                    text: "Height (m)"
                },
                beginAtZero: true,
                grid: { display: false, },
            },
            y1: {
                position: 'right',
                title: {
                    display: true,
                    text: "Period (s)"
                },
                beginAtZero: true,
                grid: { display: false, }
            },
            y2: {
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
    const { swell, chop, period, direction, time } = data;
    const labels = time.data.map((UTCString) => {
        return new Date(UTCString).getHours()
    })

    return {
        labels,
        datasets: [{
            label: 'Swell',
            data: swell,
            fill: true,
            backgroundColor: 'rgba(96, 119, 234, 0.5)',
            borderColor: 'rgb(96, 119, 234)',
            borderWidth: 0,
            pointRadius: 2,
            pointHoverRadius: 10,
        },
        {
            label: 'Chop',
            data: chop,
            borderColor: '#D1CFE2',
            borderDash: [10, 5],
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 6,
        },
        {
            label: 'Period',
            data: period,
            borderColor: '#29E7CD',
            borderWidth: 4,
            pointRadius: 0,
            pointHoverRadius: 8,
            yAxisID: 'y1'
        },
        {
            label: 'Direction',
            data: direction,
            borderWidth: 4,
            borderWidth: 0,
            pointRadius: 0,
            pointHoverRadius: 0,
            yAxisID: 'y2'
        }]
    }
}