import Head from 'next/head'
import Link from 'next/link'

import useSecurity from '../useSecurity'
import Layout from '../components/layout'


export default function Home() {
  const { isLoggedIn } = useSecurity()

  return (
    <Layout>
      <div className="container">

        <Head>
          <title>'t Klein Moment</title>
        </Head>

        <main>
          <h1>Start of 't Klein Moment</h1>
          {isLoggedIn && <p>INGELOGD</p> || <p>BEZOEKER</p>}
        </main>
        
      </div>
    </Layout>
  )
}
