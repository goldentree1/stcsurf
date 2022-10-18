import Head from 'next/head'
import Header from '@components/navigation'
import Footer from '@components/footer'
import Layout from '@components/layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>aerfejs Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>Hello</p>
      </main>

    </Layout>
  )
}
