import Layout from '../components/layout'
import ContactForm from '../components/ContactForm'

export default ({footerData}) => {
    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - Contact`}>
                <ContactForm />
            </Layout>
        </>
    )
}

export const getStaticProps = async () => {
    const getFooterData = require('../components/footer/FooterData')
  
    return {
      props: {
        footerData: await getFooterData()
      }
    }
  }