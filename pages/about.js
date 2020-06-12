import axios from 'axios'

import Layout from '../components/layout'
import About from '../components/About'

export default ({abouts, footerData}) => {
    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - About`}>
                <About abouts={abouts}/>
            </Layout>
        </>
    )
}

// Alle biografie gegevens ophalen uit de database on build time en deze returnen aan de export default hierboven
export const getStaticProps = async () => {
    const response = await axios.get(`https://wdev.be/wdev_roel/eindwerk/api/abouts`, JSON)
    const aboutList = response.data['hydra:member']
    console.log(aboutList)

    const getFooterData = require('../components/footer/FooterData')

    return {
        props: {
            abouts: aboutList,
            footerData: await getFooterData()
        }
    }
}