import Head from 'next/head'
import SimpleReactLightBox from "simple-react-lightbox"

import Navbar from './navigatie/Navbar'
import Footer from '../components/footer/Footer'

// Layout voor een pagina
export default ({ children, footerData, title }) => {
    return (
        <div className='wrapper'>
            {/* SimpleReactLightBox is een wrapper voor sliders in je project. In dit geval die op index.js */}
            <SimpleReactLightBox>
                <Head>
                    <meta charSet="UTF-8"/>
                    <title>{title}</title>
                    <link rel="icon" href="/favicon-lens.jpg" />
                    <link rel="icon" href="/logo.png" />
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="title" content="'t Klein Moment"></meta>
                    <meta name="description" content="'t Klein Moment is een portfolio site van fotograaf Bert, die gebruikers de mogelijkheid geeft om foto's te downloaden in volle kwaliteit"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>

                    {/* Facebook */}
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://t-klein-moment.vercel.app/"/>
                    <meta property="og:title" content="'t Klein Moment"/>
                    <meta property="og:description" content="'t Klein Moment is een portfolio site van fotograaf Bert, die gebruikers de mogelijkheid geeft om foto's te downloaden in volle kwaliteit"/>
                    <meta property="og:image" content="https://t-klein-moment.vercel.app/logo.png"/>

                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content="https://t-klein-moment.vercel.app/"/>
                    <meta property="twitter:title" content="'t Klein Moment"/>
                    <meta property="twitter:description" content="'t Klein Moment is een portfolio site van fotograaf Bert, die gebruikers de mogelijkheid geeft om foto's te downloaden in volle kwaliteit"/>
                    <meta property="twitter:image" content="https://t-klein-moment.vercel.app/logo.png"/>
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
  