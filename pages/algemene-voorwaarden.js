import Layout from '../components/layout'
import AlgemeneVoorwaarden from '../components/AlgemeneVoorwaarden'

export default ({footerData}) => {
    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - Gebruiksvoorwaarden`}>
                <AlgemeneVoorwaarden />
            </Layout>
        </>
    )
}

// Uitvoeren on build time en returnen aan de export default hierboven
export const getStaticProps = async () => {
    /* Footer data ophalen */
    const getFooterData = require('../components/footer/FooterData')
  
    return {
      props: {
        footerData: await getFooterData()
      }
    }
  }