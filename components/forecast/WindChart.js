import React from 'react';
import { Chart as ChartJS, CategoryScale, Filler, LinearScale, BarElement, Tooltip, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import constructDirectionArrowAnnotations from './chartjs/PluginDirectionArrows';
import WeekdayLabels from './chartjs/WeekdayLabels';

ChartJS.register(annotationPlugin, WeekdayLabels, CategoryScale, LinearScale, BarElement, Filler, Tooltip, PointElement, LineElement);

export default function WindChart({ data }) {
    return (
        <Line
            data={constructData(data)}
            width={400}
            height={80}
            options={constructOptions(data)}
        />
    )
}

//Constructs Chart.js options object for WindChart
function constructOptions(data) {
    const { wind10m, windDir10m, time } = data;
    return {
        layout: {
            padding: {
                top: 55,
                right: 52,
            }
        },
        plugins: {
            weekdaylabels: {
                dates: time.data,
                position: 'top',
                fontStyle:"bold 18px sans-serif"
            },
            annotation: {
                annotations:{
                    ...constructDirectionArrowAnnotations(wind10m, windDir10m, 'orange'),
                }
            },
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
            y1:{
                display:false,
            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    }
}

//Constructs Chart.js data object for WindChart
function constructData(data) {
    const { wind10m, windGust10m, windDir10m, time } = data;
    const labels = time.data.map((UTCString) => (
        new Date(UTCString).getHours()
    ));
    return {
        labels,
        datasets: [{
            label: 'Wind',
            data: wind10m,
            fill:true,
            borderColor: 'rgba(155, 155, 155, 0.6)',
            pointRadius:0,
            backgroundColor:"white",
            pointHoverRadius:10,
            borderWidth: 3,
        },
        {
            label: 'Gusts',
            data: windGust10m,
            borderColor: "#d1cfe2a1",
            pointRadius: 0,
            pointHoverRadius:10,
            borderWidth: 3,
            yAxisID: 'y'
        },
        {
            label: 'Direction',
            data: windDir10m,
            borderWidth: 0,
            pointRadius:0,
            pointHoverRadius:0,
            yAxisID: 'y1'
        }]
    }
}
