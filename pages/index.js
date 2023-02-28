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
const stClairId = "62aaf4fcba7c34e01eb928d8";

export async function getStaticProps() {
    //get st clair forecast
    const forecast = await getForecast(stClairId, new Date());

    //get st clair tides
    const tide = await getTide(stClairId, new Date());

    return {
        props: {
            forecast: JSON.stringify(forecast),
            tide: JSON.stringify(tide)
        }
    };
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        const { forecast, tide } = this.props;
        this.state = {
            forecast: JSON.parse(forecast),
            tide: JSON.parse(tide)
        };
    };

    handleDateChange = async (date) => {
        //Hit forecast api
        axios.post("/api/forecast", {
            id: stClairId,
            date: new Date(date).setHours(23, 59, 59, 999)
        }).then(({ data }) => {
            if (!data) {
                throw new Error('Forecast data was empty...')
            }
            this.setState({ forecast: data });
        }).catch(err => { console.error("Server couldn't find forecast") });

        //Hit tide api
        axios.post("/api/tide", {
            id: stClairId,
            date: new Date(date).setHours(23, 59, 59, 999)
        }).then(({ data }) => {
            console.log(data);
            if (!data) {
                throw new Error('Tide data was empty...')
            }
            this.setState({ tide: data });
        }).catch(err => { console.error("Server couldn't find tide for that date") })
    };

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
