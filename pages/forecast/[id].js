import React from 'react';
import Head from 'next/head';
import Datepicker from '../../components/forecast/Datepicker';
import Graphs from '../../components/forecast/Graph';
import Layout from '../../components/layout';
import { getAllLocationIDs, getForecast, getLocation } from 'utils/forecast';
import { Chart } from 'react-chartjs-2'

export async function getStaticPaths() {
    const paths = await getAllLocationIDs();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { id } }) {
    const location = await getLocation(id);
    const forecast = await getForecast(id);
    return {
        props: {
            id,
            forecast,
            location
        }
    }
}

export default class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast: this.props.forecast, 
            location: this.props.location
        }
    }

    handleDateChange = (newData) => {
        //Logic is in the 'Datepicker'
        alert(JSON.stringify(newData)); //proof it works
        this.setState({ ...newData });
    }

    render() {
        const { forecast, location } = this.state;
        return (
            <Layout>
                <Head>
                    <title></title>
                </Head>
                <h1>{forecast.data.swellHeight}</h1>
                <h2>{location.name}</h2>
                <Graphs data={forecast} />
                <Datepicker id={location.id} onDateChange={this.handleDateChange} />
            </Layout>
        )
    }
}
