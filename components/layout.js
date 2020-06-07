import Head from 'next/head'

import Navbar from './Navbar'
import Footer from '../components/footer/Footer'

export default ({ children, footerData, title }) => {

    return (
        <div>
            <Head>
                <meta charSet="UTF-8"/>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <header>
                <Navbar />
            </header>
        
            <main>
                {children}
            </main>

            <footer>
                <Footer footerData={footerData} />
            </footer>
            
        </div>
    )
  }
  