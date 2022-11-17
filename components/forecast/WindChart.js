import React from 'react';
import './ChartJS/index.js';
import { Line } from 'react-chartjs-2';
import constructDirectionArrowAnnotations from './ChartJS/annotateDirArrows';

export default function WindChart({ data }) {
    return (
        <Line
            width={100}
            height={20}
            data={constructData(data)}
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
            },
            annotation: {
                annotations: {
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
            y1: {
                display: false,
            },
        },
    }
}

//Constructs Chart.js data object for WindChart
function constructData(data) {
    const { wind10m, windGust10m, windDir10m, time } = data;
    const labels = time.data.map((utc) => (new Date(utc).getHours()));
    return {
        labels,
        datasets: [{
            label: 'Wind',
            data: wind10m,
            fill: true,
            borderColor: 'rgba(155, 155, 155, 0.6)',
            backgroundColor:'rgba(0,0,0,0)'
        },
        {
            label: 'Gusts',
            data: windGust10m,
            borderColor: "#d1cfe2a1",
            yAxisID: 'y'
        },
        {
            label: 'Direction',
            data: windDir10m,
            borderWidth: 0,
            pointHoverRadius: 0,
            yAxisID: 'y1'
        }]
    }
}
