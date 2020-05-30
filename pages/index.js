import Head from 'next/head'
import Link from 'next/link'
import useSecurity from '../useSecurity'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Home() {
  const { isLoggedIn } = useSecurity()
  const [menu, setMenu] = useState([])

  useEffect( ()=>{
    axios.get('https://wdev.be/wdev_roel/eindwerk/api/menus', JSON)
      .then( res => {
        setMenu(res.data['hydra:member'])
      })
  }, [])

  return (
    <div className="container">
      <Head>
        <title>'t Klein Moment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <h1>Start of 't Klein Moment</h1>
        {isLoggedIn && <p>INGELOGD</p> || <p>BEZOEKER</p>}
        {!isLoggedIn &&
          <>
            <Link href='/login'><a>Login</a></Link>
            <Link href='/register'><a>Register</a></Link> 
          </>
          ||
          <Link href='/logout'><a>Logout</a></Link>
        }

        <ul>
          {menu.map(item => <li key={item.ordering}>{item.name}</li> )}
        </ul>
      </main>
      
      <footer>
     
      </footer>
    </div>
  )
}
