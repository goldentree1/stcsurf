import React from 'react';
import './chartjs/index.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default function TideChart({ data }) {
    return (
        <div>
            <Line
                width={100}
                height={35}
                data={constructData(data)}
                options={constructOptions(data)}
                plugins={[ChartDataLabels]}
            />
        </div>
    )
}

function constructData(data) {
    const times = data.data.map((tide) => (tide.time))
    const types = data.data.map((tide) => (tide.type))
    const heights = data.data.map((tide) => (tide.height))
    const labels = times.map((utc) => (`${new Date(utc).toLocaleTimeString()}`));

    return {
        labels: labels,
        datasets: [
            {
                label: 'TYPE',
                data: types,
                fill: true,
                borderColor: 'rgba(155, 155, 155, 0.6)',
                backgroundColor: 'rgba(0,0,0,0)'
            },
            {
                label: 'TYPE',
                data: heights,
                fill: true,
                backgroundColor: 'rgba(164, 172, 245, 0.2)',
                borderColor: 'rgba(164, 172, 245, 0.2)',
            },
        ]
    }
}

function constructOptions(data) {
    const times = data.data.map((tide) => (tide.time))
    return {
        layout: {
            padding: {
                top: 100,
                right: 52,
            }
        },
        plugins: {
            datalabels: {
                formatter: function (value, context) {
                    return `${context.chart.data.labels[context.dataIndex]}: ${Math.round(value * 100) / 100}m`;
                }
            },
            weekdaylabels: {
                dates: times,
                position: 'top',
                offset:20,
            },
        },
        scales: {
            x: {
                position: 'top',
                display:false,
                grid: { display: false, }
            },
            y: {
                title: {
                    display: true,
                    text: "Mean Sea Level (m)"
                },
                beginAtZero: true,
                grid: { display: false, },
            },
        }
    };
}