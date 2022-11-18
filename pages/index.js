import Head from 'next/head';
import Link from 'next/link';
import Layout from '@components/layout';
import { getAllLocationsData } from './../utils/location';

export async function getStaticProps() {
  const locations = await getAllLocationsData();
  return {
    props: {
      locationData: JSON.stringify(locations),
    }
  };
};

export default function Home({locationData}) {
  const locations = JSON.parse(locationData);
  return (
    <Layout>
      <Head>
        <title>aerfejs Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          {locations.map((location, i)=>(
            <li key={`forecast-link-${i}`}>
              <Link href={`/forecast/${location._id}`}>
                <a>{location.location.place}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};
