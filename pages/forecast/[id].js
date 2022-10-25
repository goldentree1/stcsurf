import React from 'react';
import Head from 'next/head';
import ForecastChanger from '../../components/forecast/ForecastChanger';
import Layout from '../../components/layout';
import { getForecast } from 'utils/forecast';
import { getAllLocationIDs, getLocation } from 'utils/location';
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
        const { forecast, location } = this.state;
        return (
            <Layout>
                <h2 className='display-3 text-center mb-5'>{location.location.place} Surf Forecast</h2>
                <div className='row'>
                    <section className='col-xl-9 shadow-lg'>
                        <WindChart data={forecast.data} />
                        <SwellChart data={forecast.data} />
                    </section>
                    <aside className='col-xl-3 d-flex flex-column align-items-center'>
                        <ForecastChanger
                            id={location._id}
                            onDateChange={this.handleDateChange}
                        />
                        <div className='mt-auto'>
                            <small className=''>Forecast via {forecast.website} at {forecast.retrieved}</small>
                        </div>
                    </aside>
                </div>
            </Layout>
        )
    }
}
