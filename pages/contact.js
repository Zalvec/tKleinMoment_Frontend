import Layout from '../components/layout'
import ContactForm from '../components/ContactForm'

// Pagina waar gebruikers contact kunnen opnemen met de fotograaf
export default ({footerData}) => {
    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - Contact`}>
                <ContactForm />
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