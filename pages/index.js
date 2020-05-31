import Head from 'next/head'
import Link from 'next/link'
import useSecurity from '../useSecurity'
import axios from 'axios'
import { useState, useEffect } from 'react'

// import React from 'react'
// import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography'
// import Grid from '@material-ui/core/Grid'
// import CircularProgress from '@material-ui/core/CircularProgress';

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
      {/* <CircularProgress color="secondary" />
      <Paper >
            {
              <img
                style={{ width: '350px' }}
                src="https://source.unsplash.com/user/erondu"
                alt="background"
              />
            }
            <div  />
            <Grid container>
              <Grid item md={6}>
                <div>
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    Title of a longer featured blog post
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    Multiple lines of text that form the lede, informing new readers
                    quickly and efficiently about what&apos;s most interesting in this
                    post&apos;s contents.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper> */}
      </footer>
    </div>
  )
}
