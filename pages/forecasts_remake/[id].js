import React from 'react';
import axios from 'axios';
import Layout from '@components/layout';
import DateSelector from '@components/DateSelector';
import SwellChart from '@components/forecast/SwellChart';
import WindChart from '@components/forecast/WindChart';
import TideChart from '@components/forecast/TideChart';
import styles from '@styles/Forecasts_remake.module.css';
import { getAllLocationIDs, getLocation } from 'utils/location';
import { getForecast } from 'utils/forecast';
import { getTide } from 'utils/tide';

export async function getStaticPaths() {
    const paths = await getAllLocationIDs();
    return {
        paths,
        fallback: false,
    };
};

export async function getStaticProps({ params: { id } }) {
    const location = await getLocation(id);
    const forecast = await getForecast(id, new Date());
    const tide = await getTide(id, new Date());
    return {
        props: {
            forecast: JSON.stringify(forecast),
            location: JSON.stringify(location),
            tide: JSON.stringify(tide)
        }
    };
};

export default class Forecast extends React.Component {
    constructor(props) {
        super(props);
        const { forecast, location, tide } = this.props;
        this.state = {
            forecast: JSON.parse(forecast),
            location: JSON.parse(location),
            tide: JSON.parse(tide)
        };
    };

    handleDateChange = async (date) => {
        axios.post("/api/forecast", {
            id: this.state.location._id,
            date: new Date(date).setHours(23, 59, 59, 999)
        }).then(({ data }) => {
            if (!data) {
                throw new Error('There was no data!?')
            }
            this.setState({ forecast: data });
        }).catch(err => {
            throw new Error('status 500. Couldnt respond with request forecast: ' + err)
        })
    };

    //TODO: 'Updated text' GIVES A HYDRATION ERROR IN PRODUCTION - probably bc
    // time zones dont match - so they are different in server vs client. 
    //Keeping it as just 'forecast.retrieved' works fine
    render() {
        const { forecast, location, tide } = this.state;
        return (
            <Layout page="forecasts">
                <div className={styles.alignWithCharts}>
                    <h2 className={styles.locationText}>
                        {location.location.city}, {location.location.country}
                    </h2>
                    <h1>
                        {location.location.place} Swell Forecast
                    </h1>
                    <section>
                        <img src="https://static.topomap.co.nz/tiles-topo50/14-15951-5834.png" />
                    </section>
                </div>


                <div className={styles.chartsContainer}>
                    <div className={styles.charts}>
                        <h3 className={styles.alignWithCharts}>
                            7 Day Wind and Swell
                        </h3>
                        <section>
                            <WindChart data={forecast.data} />
                            <SwellChart data={forecast.data} />
                        </section>
                        <h3 className={styles.alignWithCharts}>
                            Tides
                        </h3>
                        <section>
                            <TideChart data={tide} />
                        </section>
                    </div>
                    <aside className={styles.sidebar}>
                        <DateSelector onDateChange={this.handleDateChange} />
                        <div>
                            <p>
                                {forecast.retrieved}
                            </p>
                        </div>
                    </aside>
                </div>
                <h3 className={styles.alignWithCharts}>
                    Webcams
                </h3>
                <div className={styles.webcamsContainer}>
                    <div className={styles.webcam}>
                        <iframe src="https://v.angelcam.com/iframe?v=jzr1v2kjrn&amp;autoplay=1" webkitallowfullscreen="false" mozallowfullscreen="false" allowfullscreen="false" style={{ height: 100 + '%', width: 100 + '%' }} frameborder="0"></iframe>
                    </div>
                    <div className={styles.webcam}>
                        <img src="https://www.wickednetworks.co.nz/webcams/current-stclair.jpg" />
                    </div>
                </div>

            </Layout>
        )
    }
}
