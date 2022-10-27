import{Chart as ChartJS} from 'chart.js';
ChartJS.defaults.borderColor = "rgba(0,0,0,0)";
ChartJS.defaults.elements.point.radius = 0;
ChartJS.defaults.elements.point.hoverRadius = 10;
ChartJS.defaults.elements.point.borderWidth = 3;
ChartJS.defaults.elements.line.tension = 0.5;
ChartJS.defaults.interaction.intersect = false;
ChartJS.defaults.interaction.mode = "index";

const defaults = {
    borderColor:"rgba(0,0,0,0)",
    elements:{
        point:{
            radius:0,
            hoverRadius:10,
            borderWidth:3
        },
        line:{
            tension:0.5
        }
    },
    interaction:{
        intersect:false,
        mode: 'index'
    }
}