import React from 'react';
import axios from 'axios';
import styles from '@styles/Home.module.css';
import Layout from '@components/layout';
import DateSelector from '@components/DateSelector';
import SwellChart from '@components/forecast/SwellChart';
import WindChart from '@components/forecast/WindChart';
import TideChart from '@components/forecast/TideChart';
import LocaleDateStamp from '@components/LocaleDateStamp';
import { getForecast } from 'utils/forecast';
import { getTide } from 'utils/tide';

//This website only needs St Clair ID.
const beachID = "62aaf4fcba7c34e01eb928d8";

/**
 * Retrieves St Clair Beach tide and weather data from the database
 * to statically generate the Home Page
 * @returns props for Home Page
 */
export async function getStaticProps() {

    // retrieve forecast and tides data
    const forecast = await getForecast(beachID, new Date());
    const tide = await getTide(beachID, new Date());

    return {
        props: {
            forecast: JSON.stringify(forecast),
            tide: JSON.stringify(tide)
        }
    }
}

/**
 * Home Page component displays data from
 * a single Location's most recent Forecast and Tides
 * 
 */
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        const { forecast, tide } = this.props;
        this.state = {
            forecast: JSON.parse(forecast),
            tide: JSON.parse(tide)
        };
    };

    /**
     * Method to handle the Date Selector's date changing.
     * Attempts to load the new selected date's forecast and tide data
     * @param {Date} date 
     * @returns {void}
     */
    handleDateChange = async (date) => {
        //retrieve forecast - the swell & wind data
        axios.post("/api/forecast", {
            id: beachID,
            date: new Date(date).setHours(23, 59, 59, 999)
        }).then(({ data }) => {
            if (!data) {
                throw new Error('Forecast data was empty...')
            }
            this.setState({ forecast: data });
        }).catch(err => { console.error("Server couldn't find forecast") });

        //retrieve tide data
        axios.post("/api/tide", {
            id: beachID,
            date: new Date(date).setHours(23, 59, 59, 999)
        }).then(({ data }) => {
            console.log(data);
            if (!data) {
                throw new Error('Tide data was empty...')
            }
            this.setState({ tide: data });
        }).catch(err => { console.error("Server couldn't find tide for that date") })
    }

    /**
     * Method to render the page
     * @returns {React.Component} JSX Page
     */
    render() {
        const { forecast, tide } = this.state;
        return (
            <Layout page="forecasts">
                <header className={styles.header}>
                    <div className={styles.alignWithCharts}>
                        <h1 className={styles.locationText}>
                            St Clair, Dunedin
                        </h1>
                        <h1 className={styles.mainTitle}>
                            Swell Forecast
                        </h1>
                    </div>
                </header>
                <div className={styles.chartsContainer}>
                    <div className={styles.charts}>
                        <section className='pt-2'>
                            <h2 className={styles.titleInChartsContainer}>
                                Wind / Swell
                            </h2>
                            <WindChart
                                data={forecast.data} />
                            <SwellChart
                                data={forecast.data} />
                        </section>
                        <section className='pt-6'>
                            <h2 className={styles.titleInChartsContainer}>
                                Tides
                            </h2>
                            <TideChart
                                data={tide.data} />
                        </section>
                    </div>
                    <aside className={styles.sidebar}>
                        <div>
                            <DateSelector
                                onDateChange={this.handleDateChange} />
                        </div>
                        <div>
                            <p className={styles.updatedAt}>
                                <LocaleDateStamp
                                    utc={forecast.retrieved} >
                                    Weather
                                </LocaleDateStamp>
                            </p>
                            <p className={styles.updatedAt}>
                                <LocaleDateStamp
                                    utc={tide.retrieved} >
                                    Tides
                                </LocaleDateStamp>
                            </p>
                            <div>
                            </div>
                        </div>
                    </aside>
                </div>
                <section className={styles.alignWithCharts}>
                    <div className='pt-4'></div>
                    <h2 className={styles.title}>
                        Webcams
                    </h2>
                    <div className='pt-2'></div>
                    <div className={styles.webcamsContainer}>
                        <div className={styles.webcam}>
                            <iframe src="https://v.angelcam.com/iframe?v=jzr1v2kjrn&amp;autoplay=1" webkitallowfullscreen="false" mozallowfullscreen="false" allowfullscreen="false" style={{ height: 100 + '%', width: 100 + '%' }} frameborder="0"></iframe>
                        </div>
                        <div className={styles.webcam}>
                            <img src="https://www.wickednetworks.co.nz/webcams/current-stclair.jpg" />
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }
}
