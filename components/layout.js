import Head from 'next/head';
import Navigation from './navigation';
import NewNavigation from './new_navigation';
import Footer from './footer';

export default function Layout({ children, pageName }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Surf Forecast"/>
            </Head>
            <NewNavigation />
            <main className="container-fluid d-flex flex-column">
                {children}
            </main>
            <Footer />
        </>
    )
}