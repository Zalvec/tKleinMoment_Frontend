import Layout from '../components/layout'
import GDPR from '../components/GDPR'

// Pagina met informatie ivm GDPR en de toepassing hiervan
export default ({footerData}) => {
    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - GDPR`}>
                <GDPR />
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