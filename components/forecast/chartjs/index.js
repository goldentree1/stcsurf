import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, Filler, LinearScale, LineElement, Tooltip, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import constructDirectionArrowAnnotations from './chartjs/annotateDirArrows';
import WeekdayLabels from './chartjs/pluginWeekdayLabels';

ChartJS.register(annotationPlugin, BarElement, CategoryScale, Filler, LinearScale, LineElement, Tooltip, PointElement, WeekdayLabels);
export default ChartJS;