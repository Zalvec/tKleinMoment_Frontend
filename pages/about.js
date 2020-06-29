import axios from 'axios'

import Layout from '../components/layout'
import About from '../components/About'

// Pagina met informatie over en van de fotograaf
export default ({abouts, footerData}) => {
    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - About`}>
                <About abouts={abouts}/>
            </Layout>
        </>
    )
}

// Uitvoeren on build time en returnen aan de export default hierboven
export const getStaticProps = async () => {
    /* Alle about data ophalen uit de database */
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}abouts`, JSON)
    const aboutList = response.data['hydra:member']

    /* Footer data ophalen */
    const getFooterData = require('../components/footer/FooterData')

    return {
        props: {
            abouts: aboutList,
            footerData: await getFooterData()
        }
    }
}