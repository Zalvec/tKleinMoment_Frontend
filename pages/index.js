import Head from 'next/head'
import useSecurity from '../useSecurity'

export default function Home() {
  const { isLoggedIn } = useSecurity()
  console.log(localStorage.getItem('token'))
  return (
    <div className="container">
      <Head>
        <title>'t Klein Moment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Start of 't Klein Moment</h1>
        {isLoggedIn && <p>INGELOGD</p> || <p>BEZOEKER</p>}
      </main>

      <footer>
     
      </footer>
    </div>
  )
}
