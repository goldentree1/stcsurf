export const WeekdayLabels = {
    id: 'weekdaylabels',
    afterDatasetsDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.font = 'bolder 12px sans-serif';
        ctx.fillStyle = 'rgb(17, 17, 17)';
        ctx.textAlign = 'center'
        const graphWidth = chart.width - chart.chartArea.left - (chart.width - chart.chartArea.right);
        const labels = computeLabelsAndPositions(options.dates, graphWidth);
        const position = options.position === 'bottom' ? chart.height : chart.chartArea.top - 50;
        for (let label of labels) {
            ctx.fillText(label.date.toDateString().slice(0, 3), chart.chartArea.left + label.xShift, position)
        }

        function computeLabelsAndPositions(dates, totalWidth) {
            let xShift = 0;
            let prevXShift = 0;
            const oneUnitWidth = totalWidth / dates.length;
            const dateStrings = dates.map(date => new Date(date).toDateString());
            const uniqueDates = getUniqueValues(dateStrings).map(dateStr => new Date(dateStr));

            //Make date objects
            //Can probably simplify xShift - 
            //We only use the most common units (8)...
            //and never use other units.
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

            //remove date objects that are past boundary.
            return dateObjs.filter((dateObj) => {
                return dateObj.xShift <= totalWidth;
            })
        };
        function getUniqueValues(arr) {
            return [... new Set(arr)];
        };

        function numberOfOccurrences(val, arr) {
            let occurrences = 0;
            for (let arrayVal of arr) {
                if (val === arrayVal) {
                    occurrences++;
                }
            }
            return occurrences;
        }
    },
    defaults: {
        dates: ["2022-10-19T11:00:00Z"],
        position: "bottom",
        font: 'bolder 12px sans-serif',
        fillStyle: 'rgb(0,0,0)',
        textAlign: 'center'
    }
}