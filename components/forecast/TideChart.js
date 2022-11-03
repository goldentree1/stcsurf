import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, Filler, LinearScale, LineElement, Tooltip, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import constructDirectionArrowAnnotations from './chartjs/annotateDirArrows';
import WeekdayLabels from './chartjs/pluginWeekdayLabels';

ChartJS.register(annotationPlugin, WeekdayLabels, CategoryScale, LinearScale, BarElement, Filler, Tooltip, PointElement, LineElement);


export default function TideChart({ data }) {
    return (
        <div>
            <Line
                width={100}
                height={20}
                data={constructData(data)}
                options={constructOptions(data)}
            />
        </div>
    )
}

function constructData(data) {
    const times = data.data.map((tide) => (tide.time))
    const types = data.data.map((tide) => (tide.type))
    const heights = data.data.map((tide) => (tide.height))
    const labels = times.map((utc) => (new Date(utc)));

    return {
        labels,
        datasets: [
            {
                label: 'TYPE',
                data: types,
                fill: true,
                borderColor: 'rgba(155, 155, 155, 0.6)',
                backgroundColor:'rgba(0,0,0,0)'
            },
            {
                label: 'TYPE',
                data: heights,
                fill: true,
                borderColor: 'rgba(155, 155, 155, 0.6)',
                backgroundColor:'rgba(0,0,0,0)'
            },
        ]
    }
}

function constructOptions(data) {
    return {};
}