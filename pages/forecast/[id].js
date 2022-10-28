import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import stClairMap from 'public/stclair_map_scrnshot.png';
import Layout from '@components/layout';
import DateSelector from '@components/DateSelector';
import SwellChart from '@components/forecast/SwellChart';
import WindChart from '@components/forecast/WindChart';
import { getAllLocationIDs, getLocation } from 'utils/location';
import { getForecast } from 'utils/forecast';

export async function getStaticPaths() {
    //Should we connect to DB once here??
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

    handleDateChange = (date) => {
        if (new Date(date) > new Date()) {  //INSTEAD OF THIS - make DateSelector have displayFutureDates={false}
            throw new Error('Even we cant predict the future')
        }

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

    //TODO: styles - make the calender sticky position, so can update everything as we scroll!
    //past the forecast can be tides, then photos / snapshots from webcams, then can be statistics
    //styles-loading wave icon on calender somehow?
    render() {
        const { forecast, location } = this.state;
        return (
            <Layout>
                <div className='container my-5 d-flex flex-column align-items-center'>
                    <h1 className='display-1 my-5 text-center'>
                        Surf Forecast for {location.location.place}, {location.location.city}, {location.location.country}
                    </h1>
                </div>
                <div className='row'>
                    <section className='col-xl-9 m-0 p-0 mt-4'>
                        <div className='shadow-lg p-3 border'>
                            <WindChart data={forecast.data} />
                            <SwellChart data={forecast.data} />
                        </div>
                    </section>
                    <aside className='sticky-xl-top top-0 col-xl-3 d-flex min-vh-100 flex-column justify-content-between pb-5 pt-3 align-items-center'>
                        <DateSelector onDateChange={this.handleDateChange} />
                        <div className='text-center'>
                            Updated <b> {new Date(forecast.retrieved).toDateString()}</b> {new Date(forecast.retrieved).getHours()}:{new Date(forecast.retrieved).getMinutes()}
                            <br />
                            <small>
                                Forecast data via <Link href='/'>{forecast.website}</Link>
                            </small>
                        </div>
                    </aside>
                    <div className='col-xl-9 mb-5 p-0'>
                        <div className="alert bg-white shadow-lg py-5 mw-100 alert-success alert-dismissible fade show text-center rounded-0" role="alert">
                            Had a good surf lately? <a href="#" className="alert-link">Keep a record</a> so we can notify you when it's on again!
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
