const dateArrayJSON = ["2022-10-19T11:00:00Z", "2022-10-19T14:00:00Z", "2022-10-19T17:00:00Z", "2022-10-19T20:00:00Z", "2022-10-19T23:00:00Z", "2022-10-20T02:00:00Z", "2022-10-20T05:00:00Z", "2022-10-20T08:00:00Z", "2022-10-20T11:00:00Z", "2022-10-20T14:00:00Z", "2022-10-20T17:00:00Z", "2022-10-20T20:00:00Z", "2022-10-20T23:00:00Z", "2022-10-21T02:00:00Z", "2022-10-21T05:00:00Z", "2022-10-21T08:00:00Z", "2022-10-21T11:00:00Z", "2022-10-21T14:00:00Z", "2022-10-21T17:00:00Z", "2022-10-21T20:00:00Z", "2022-10-21T23:00:00Z", "2022-10-22T02:00:00Z", "2022-10-22T05:00:00Z", "2022-10-22T08:00:00Z", "2022-10-22T11:00:00Z", "2022-10-22T14:00:00Z", "2022-10-22T17:00:00Z", "2022-10-22T20:00:00Z", "2022-10-22T23:00:00Z", "2022-10-23T02:00:00Z", "2022-10-23T05:00:00Z", "2022-10-23T08:00:00Z", "2022-10-23T11:00:00Z", "2022-10-23T14:00:00Z", "2022-10-23T17:00:00Z", "2022-10-23T20:00:00Z", "2022-10-23T23:00:00Z", "2022-10-24T02:00:00Z", "2022-10-24T05:00:00Z", "2022-10-24T08:00:00Z", "2022-10-24T11:00:00Z", "2022-10-24T14:00:00Z", "2022-10-24T17:00:00Z", "2022-10-24T20:00:00Z", "2022-10-24T23:00:00Z", "2022-10-25T02:00:00Z", "2022-10-25T05:00:00Z", "2022-10-25T08:00:00Z", "2022-10-25T11:00:00Z", "2022-10-25T14:00:00Z", "2022-10-25T17:00:00Z", "2022-10-25T20:00:00Z", "2022-10-25T23:00:00Z", "2022-10-26T02:00:00Z", "2022-10-26T05:00:00Z", "2022-10-26T08:00:00Z", "2022-10-26T11:00:00Z"];

const dateArray = dateArrayJSON.map((jsonDate) => {
    return new Date(jsonDate);
});

console.log(computeLabelPositionsFromDates3(dateArray, 57));

function computeLabelPositionsFromDates(dateArr, totalWidth) {
    let days = [];
    //calculate no. of occurrences of each date (units) (could be 'function extractUniqueDatesFromArray(){}')
    dateArr.forEach((date) => {
        const dateString = date.toDateString();
        let isDistinctDay = true;
        for (let day of days) {
            if (dateString === day.dateString) {
                isDistinctDay = false;
                day.units += 1;
                break;
            }
        }
        isDistinctDay && days.push({
            dateString,
            units: 1
        });
    });

    //Position labels according to where days are. (could be 'function calculateLabelPositions(){}')
    const oneUnit = totalWidth / dateArr.length;
    const xOffsetToCenter = (days[0].units * oneUnit) / 2;
    let xShiftTotal = 0 - xOffsetToCenter;
    days.forEach((day) => {
        day.width = day.units * oneUnit;
        day.date = new Date(day.dateString);
        day.xPos = day.width + xShiftTotal;
        xShiftTotal += day.width;
    })
    return days;
}





//Rewrites
// class WeekdayLabels {
//     constructor(dates, width) {
//         this.dates = dates;
//         this.width = width;
//         this.datesInfo = [];
//     }
//     init() {
//         this.dates.forEach((date) => {
//             const dateString = date.toDateString();
//             let isDistinctDay = true;
//             for (let day of this.dateInfo) {
//                 if (dateString === day.dateString) {
//                     isDistinctDay = false;
//                     day.units += 1;
//                     break;
//                 }
//             }
//             if (isDistinctDay) {
//                 this.dateInfo.push({
//                     dateString,
//                     units: 1
//                 })
//             }
//         });
//     }
//     get getDatesInfo(){
//         return this.datesInfo;
//     }
// }

// const wk = new WeekdayLabels(dateArray, 57);
// wk.init();
// console.log(wk.getDatesInfo());

function computeLabelPositionsFromDates2(dateArr, totalWidth) {
    let days = [];
    dateArr.forEach((date) => {
        const dateString = date.toDateString();
        let isDistinctDay = true;
        for (let day of days) {
            if (dateString === day.dateString) {
                isDistinctDay = false;
                day.units += 1;
                break;
            }
        }
        if (isDistinctDay) {
            days.push({
                dateString,
                units: 1
            })
        }
    });

    //Position labels according to where days are. (could be 'function calculateLabelPositions(){}')
    const oneUnit = totalWidth / dateArr.length;
    const xOffsetToCenter = (days[0].units * oneUnit) / 2;
    let xShiftTotal = 0 - xOffsetToCenter;
    days.forEach((day) => {
        day.width = day.units * oneUnit;
        day.date = new Date(day.dateString);
        day.xPos = day.width + xShiftTotal;
        xShiftTotal += day.width;
    })
    return days;
}
function computeLabelPositionsFromDates3(dates, totalWidth) {
    const dateStrings = dates.map(date => new Date(date).toDateString());
    const uniqueDates = getUniqueValues(dateStrings).map(dateStr => new Date(dateStr));
    let xShift = 0;
    const oneUnitWidth = totalWidth / dates.length;
    return uniqueDates.map((date, i) => {
        const units = numberOfOccurrences(date.toDateString(), dateStrings);
        const width = units * oneUnitWidth;
        xShift += i === 0 ? (units * oneUnitWidth) / 2 : width;
        return { 
            date, 
            units, 
            width, 
            xShift 
        }
    });
}

// function createWeekdayLabelObject(dates, totalWidth){

// }

// function generateWeekdayLabels(dates, uniqueDates, totalWidth){
//     let xShift=0;
//     const oneUnitWidth = totalWidth / dates.length;
//     return uniqueDates.map((date, i) => {
//         const units = numberOfOccurrences(date.toDateString(), dateStrings);
//         const width = units * oneUnitWidth;
//         xShift += i === 0 ? (units * oneUnitWidth) / 2 : width;
//         return { date, units, width, xShift }
//     });
// }

// function getUniqueDates(dates) {
//     const dateStrings = dates.map(date => new Date(date).toDateString());
//     return getUniqueValues(dateStrings).map(dateString => new Date(dateString));
// }

function getUniqueValues(arr) {
    return [... new Set(arr)];
}

function numberOfOccurrences(val, arr) {
    let occurrences = 0;
    for (let arrayVal of arr) {
        if (val === arrayVal) {
            occurrences++;
        }
    }
    return occurrences;
}
