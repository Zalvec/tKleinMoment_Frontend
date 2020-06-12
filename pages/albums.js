import axios from 'axios'

import Layout from '../components/layout'
import Albums from '../components/album/Albums'

export default ({albums, footerData}) => {

    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - Albums`}>
                <Albums albums={albums}/>
            </Layout>
        </>
)}

// Alle albums ophalen uit de database on build time en deze returnen aan de export default hierboven
export const getStaticProps = async () => {
    const response = await axios.get(`https://wdev.be/wdev_roel/eindwerk/api/albums`, JSON)
    const albumList = response.data['hydra:member']

    const getFooterData = require('../components/footer/FooterData')

    return {
        props: {
            albums: albumList,
            footerData: await getFooterData()
        }
    }
}