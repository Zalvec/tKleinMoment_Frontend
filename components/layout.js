import Head from 'next/head'

import Navbar from './Navbar'
import Footer from './footer'

export default ({ children, footerData, title }) => {

    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
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
  