import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Navigation from './navigation';
import Footer from './footer';

export default function Layout({ children, pageName }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Surf Forecast"/>
            </Head>

            <Navigation page={pageName}/>
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}