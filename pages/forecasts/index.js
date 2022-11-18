import Layout from '@components/layout';
import Link from 'next/link';
import { getAllLocationsData } from 'utils/location';

export async function getStaticProps() {
    const locations = await getAllLocationsData();
    return {
        props: {
            locationsData: JSON.stringify(locations),
        }
    };
};

export default function Forecasts({ locationsData }) {
    const locations = JSON.parse(locationsData);
    return (
        <Layout page="forecasts">
            <h2>Forecasts</h2>
            <ul>
                {locations.map((location, i) => (
                    <li key={`forecast-link-${i}`}>
                        <Link href={`/forecasts/${location._id}`}>
                            <a>{location.location.place}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}