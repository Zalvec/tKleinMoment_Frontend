import Head from 'next/head'
import { useMediaQuery, Container } from '@material-ui/core'

import NavbarSmall from '../components/navbars/navbar_small'
import NavbarLarge from '../components/navbars/navbar_large'
import Footer from '../components/footer'

export default ({ children }) => {
    const MediaWidth = useMediaQuery('(min-width:960px)')

    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <header style={{ margin: "5em auto"}}>
                { MediaWidth &&
                    <NavbarLarge />
                    ||    
                    <NavbarSmall />
                }
            </header>
            <Container maxWidth="md">
                <main>
                        {children}
                </main>

                <footer>
                    <Footer />
                </footer>
            </Container>
        </div>
    )
  }
  