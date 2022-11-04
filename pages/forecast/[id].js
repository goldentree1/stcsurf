import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Layout from '@components/layout';
import DateSelector from '@components/DateSelector';
import SwellChart from '@components/forecast/SwellChart';
import WindChart from '@components/forecast/WindChart';
import TideChart from '@components/forecast/TideChart';
import { getAllLocationIDs, getLocation } from 'utils/location';
import { getForecast } from 'utils/forecast';
import { tideData} from 'utils/tide';

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
            location: JSON.stringify(location),
            tide: JSON.stringify(tideData)
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

    handleDateChange = (date) => {
        axios.post("/api/forecast", {
            id: this.state.location._id,
            date: new Date(date).setHours(23, 59, 59, 999)
        }).then(({ data }) => {
            if (!data) {
                throw new Error('There was no data!?')
            }
            this.setState({ forecast: data });
        }).catch(err => {
            //TODO: Show an error dialog here
            throw new Error('status 500. Couldnt respond with request forecast: ' + err)
        })
    }

    //TODO: 'Updated text' GIVES A HYDRATION ERROR IN PRODUCTION - probably bc
    // time zones dont match - so they are different in server vs client. 
    //Keeping it as just 'forecast.retrieved' works fine
    render() {
        const { forecast, location, tide } = this.state;
        console.log(forecast);
        return (
            <Layout>
                <div className='container my-5 d-flex flex-column align-items-center'>
                    <h1 className=' my-5 '>
                        Surf Forecast for {location.location.place}, {location.location.city}, {location.location.country}
                    </h1>
                    <h3>{forecast.data.swell[0]}</h3>
                    <p>
                        
                    {tide.data[0].height}m&nbsp;
                       {tide.data[0].type} tide: 
                       {tide.data[0].time} 
                    </p>
                </div>
                <div className='row'>
                    <section className='col-xl-9 m-0 p-0 mt-5'>
                        <div className='shadow p-3 border'>
                            <WindChart data={forecast.data} />
                            <SwellChart data={forecast.data} />
                        </div>
                    </section>
                    <aside className='sticky-xl-top pt-5 top-0 col-xl-3 d-flex min-vh-100 vh-100 flex-column justify-content-between pb-5 pt-3 align-items-center'>
                        <DateSelector onDateChange={this.handleDateChange} />
                        <div className='text-center'>
                            Updated <b>{forecast.retrieved}</b>
                            <br />
                            <small>
                                Forecast data via <Link href='/'>{forecast.website}</Link>
                            </small>
                        </div>
                    </aside>
                    <div className='col-xl-9 mb-5 p-0'>
                        <div>
                            <TideChart
                                data = {tide}
                            />
                        </div>
                        <div className="alert bg-white shadow py-5 mw-100 alert-success alert-dismissible fade show text-center rounded-0" role="alert">
                            Had a good surf lately? <a href="#" className="alert-link">Keep a record</a> so we can notify you when it's on again!
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
