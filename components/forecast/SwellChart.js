import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, Filler, LinearScale, LineElement, Tooltip, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import constructDirectionArrowAnnotations from './chartjs/annotateDirArrows';
import WeekdayLabels from './chartjs/pluginWeekdayLabels';


ChartJS.register(annotationPlugin, BarElement, CategoryScale, Filler, LinearScale, LineElement, Tooltip, PointElement, WeekdayLabels);
ChartJS.defaults.borderColor = "rgba(0,0,0,0)";
ChartJS.defaults.interaction.intersect = false;
ChartJS.defaults.interaction.mode = "index";
ChartJS.defaults.elements.point.radius = 0;
ChartJS.defaults.elements.point.hoverRadius = 10;
ChartJS.defaults.elements.point.borderWidth = 3;
ChartJS.defaults.elements.line.tension = 0.5;

export default function SwellChart({ data }) {
    return (
        <Line
            width={100}
            height={34}
            data={constructData(data)}
            options={constructOptions(data)}
        />
    )
}

//Constructs Chart.js options object for SwellChart
function constructOptions(data) {
    const { swell, direction, time } = data;
    const annotations = {
        ...constructDirectionArrowAnnotations(swell, direction, "rgba(10, 118, 191, 1)")
    }
    return {
        layout: {
            padding: {
                bottom: 30,
            }
        },
        plugins: {
            annotation: {
                annotations
            },
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
    }
}

//Constructs Chart.js data object for SwellChart
function constructData(data) {
    const { swell, chop, period, face, direction, time } = data;
    const labels = time.data.map((utc) => new Date(utc).getHours());
    return {
        labels,
        datasets: [{
            label: 'Swell',
            data: swell,
            fill: true,
            backgroundColor: 'rgba(34, 142, 215, 0.35)',
            borderColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
            label: 'Face',
            data: face,
            borderDash: [5, 5],
            borderColor: 'rgba(164, 172, 245, 0.9)',
        },
        {
            label: 'Chop',
            data: chop,
            fill: true,
            backgroundColor: 'rgba(164, 172, 245, 0.2)',
            borderColor: 'rgba(164, 172, 245, 0.2)',
            borderWidth: 0,
        },
        {
            label: 'Period',
            data: period,
            borderColor: 'rgb(139, 166, 78)',
            yAxisID: 'y1'
        },
        {
            label: 'Direction',
            data: direction,
            borderWidth: 4,
            borderWidth: 0,
            pointHoverRadius: 0,
            yAxisID: 'y2'
        }]
    }
}