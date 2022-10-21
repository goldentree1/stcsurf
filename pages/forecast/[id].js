import React from 'react';
import Head from 'next/head';
import ForecastChanger from '../../components/forecast/ForecastChanger';
import Layout from '../../components/layout';
import { getAllLocationIDs, getForecast, getLocation } from 'utils/forecast';
import SwellChart from '../../components/forecast/SwellChart';
import WindChart from '../../components/forecast/WindChart';

export async function getStaticPaths() {
    const paths = await getAllLocationIDs();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { id } }) {
    const location = await getLocation(id);
    const forecast = await getForecast(id, new Date());
    return {
        props: {
            forecast: JSON.stringify(forecast),
            location: JSON.stringify(location)
        }
    }
}

export default class Forecast extends React.Component {
    constructor(props) {
        super(props);
        const { forecast, location } = this.props;
        this.state = {
            forecast: JSON.parse(forecast),
            location: JSON.parse(location),
        };
    }

    handleDateChange = (newForecast) => {
        this.setState({ forecast: newForecast });
    }

    render() {
        const { forecast, location, updated } = this.state;
        return (
            <Layout>
                <h2>
                    Location {location.location.place}
                </h2>
                <WindChart data={forecast.data} />
                <SwellChart data={forecast.data} />
                <ForecastChanger
                    id={location._id}
                    onDateChange={this.handleDateChange}/>
                <p>
                    {JSON.stringify(forecast.data.time.data[0])}
                </p>
            </Layout>
        )
    }
}
