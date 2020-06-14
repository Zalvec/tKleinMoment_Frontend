import Head from 'next/head'
import SimpleReactLightBox from "simple-react-lightbox"

import Navbar from './Navbar'
import Footer from '../components/footer/Footer'

export default ({ children, footerData, title }) => {
    return (
        <div className='wrapper'>
            {/* SimpleReactLightBox is een wrapper voor sliders in je project. In dit geval die op index.js */}
            <SimpleReactLightBox>
                <Head>
                    <meta charSet="UTF-8"/>
                    <title>{title}</title>
                    <link rel="icon" href="/favicon-lens.jpg" />
                    <meta name="description" content=""/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                </Head>
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer footerData={footerData} />
            </SimpleReactLightBox>
        </div>
    )
  }
  