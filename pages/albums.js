import axios from 'axios'

import Layout from '../components/layout'
import Albums from '../components/album/Albums'

// Pagina met een overzicht van alle albums
export default ({albums, footerData}) => {
    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - Albums`}>
                <Albums albums={albums}/>
            </Layout>
        </>
)}

// Uitvoeren on build time en returnen aan de export default hierboven
export const getStaticProps = async () => {
    /* Alle albums ophalen uit de database, gesorteerd op recenste datum eerst*/
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}albums?order[date]=desc`, JSON)
    const albumList = response.data['hydra:member']

    /* Footer data ophalen */
    const getFooterData = require('../components/footer/FooterData')

    return {
        props: {
            albums: albumList,
            footerData: await getFooterData()
        }
    }
}