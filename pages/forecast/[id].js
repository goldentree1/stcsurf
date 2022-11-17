import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import Layout from '@components/layout';
import DateSelector from '@components/DateSelector';
import SwellChart from '@components/forecast/SwellChart';
import WindChart from '@components/forecast/WindChart';
import TideChart from '@components/forecast/TideChart';
import { getAllLocationIDs, getLocation } from 'utils/location';
import { getForecast } from 'utils/forecast';
import { getTide, tideData } from 'utils/tide';

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
    const tide = await getTide(id, new Date())
    return {
        props: {
            forecast: JSON.stringify(forecast),
            location: JSON.stringify(location),
            tide: JSON.stringify(tide)
        }
    }
}

export default class Forecast extends React.Component {
    constructor(props) {
        super(props);
        const { forecast, location, tide } = this.props;
        this.state = {
            forecast: JSON.parse(forecast),
            location: JSON.parse(location),
            tide: JSON.parse(tide)
        };
    }

    handleDateChange = async(date) => {
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
    }

    //TODO: 'Updated text' GIVES A HYDRATION ERROR IN PRODUCTION - probably bc
    // time zones dont match - so they are different in server vs client. 
    //Keeping it as just 'forecast.retrieved' works fine
    render() {
        const { forecast, location, tide } = this.state;
        return (
            <Layout>
                <h2 className='container py-3'>
                    {location.location.place}
                </h2>
                <section style={{width:100+'%', paddingInline:3+'rem'}}>
                    <img src="https://static.topomap.co.nz/tiles-topo50/14-15951-5834.png"/>
                </section>
                <div className='sidebar-container mt-neg-4'>
                    <div className='main-content pt-4'>
                        <section className='chart'>
                            <WindChart data={forecast.data} />
                            <SwellChart data={forecast.data} />
                        </section>
                        <section className='chart'>
                            <TideChart data={tide} />
                        </section>
                        <section>
                            <img src="https://www.wickednetworks.co.nz/webcams/current-stclair.jpg"/>
                        </section>
                    </div>
                    <aside className='sidebar py-4'>
                        <DateSelector onDateChange={this.handleDateChange} />
                    </aside>
                </div>
            </Layout>
        )
    }
}
