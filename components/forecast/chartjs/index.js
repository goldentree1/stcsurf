import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, Filler, LinearScale, LineElement, Tooltip, PointElement } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import WeekdayLabels from './pluginWeekdayLabels';

ChartJS.register(annotationPlugin, BarElement, CategoryScale, Filler, LinearScale, LineElement, Tooltip, PointElement, WeekdayLabels);

ChartJS.defaults.borderColor = "rgba(0,0,0,0)";
ChartJS.defaults.elements.point.radius = 0;
ChartJS.defaults.elements.point.hoverRadius = 10;
ChartJS.defaults.elements.point.borderWidth = 3;
ChartJS.defaults.elements.line.tension = 0.5;
ChartJS.defaults.interaction.intersect = false;
ChartJS.defaults.interaction.mode = "index";

export default ChartJS;