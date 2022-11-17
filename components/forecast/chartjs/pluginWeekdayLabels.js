const WeekdayLabels = {
    id: 'weekdaylabels',
    afterDatasetsDraw: (chart, args, options) => {
        if (!options.dates[0]) return;
        const { ctx } = chart;
        ctx.save();
        ctx.font = options.font;
        const position = options.position === 'bottom' ? chart.height + options.offset : chart.chartArea.top - options.offset;
        const graphWidth = chart.width - chart.chartArea.left - (chart.width - chart.chartArea.right) / 2;
        const labels = computeLabelsAndPositions(options.dates, graphWidth);
        for (let label of labels) {
            ctx.fillText(label.date.toDateString().slice(0, 3), (chart.chartArea.left) / 2 + label.xShift, position)
        }
    },
    defaults: {
        dates: [],
        position: "bottom",
        font: 'bold 12px sans-serif',
        fillStyle: 'rgb(0,0,0)',
        textAlign: 'center',
        offset:50,
    }
}
export default WeekdayLabels;

//returns computed info on label text and correct label positions
function computeLabelsAndPositions(dates, totalWidth) {
    //Get all unique Date objects by day (e.g., ['tues22Dec', 'wed23Dec'])...
    const dateStrings = dates.map(date => new Date(date).toDateString());
    const uniqueDates = [... new Set(dateStrings)].map(dateStr => new Date(dateStr));

    //compute label names and positions from totalWidth and quantities of dates.
    let xShift = 0;
    let prevXShift = 0;
    const oneUnitWidth = totalWidth / dates.length;
    const dateObjs = uniqueDates.map((date, i) => {
        const units = numberOfOccurrences(date.toDateString(), dateStrings);
        const width = units * oneUnitWidth;
        xShift += i === 0 ? width / 2 : prevXShift;
        prevXShift = width;
        return {
            date,
            units,
            width,
            xShift,
        };
    });

    //remove date objects that are past boundary of chart (i.e., greater than totalWidth).
    const dateObjsInsideChartBoundary = dateObjs.filter(dateObj => (
        dateObj.xShift <= totalWidth
    ));
    return dateObjsInsideChartBoundary;
};

//returns number of times a value occurs in an array
function numberOfOccurrences(val, arr) {
    let occurrences = 0;
    for (let arrayVal of arr) {
        if (val === arrayVal) {
            occurrences++;
        }
    }
    return occurrences;
}