import Layout from '../components/layout'
import { guestUser } from '../helpers/helpers'

export default (props) => {
    return (
        <>
            <Layout footerData={props.footerData} title={`'t Klein Moment - Profiel`}>
                <h2>Profiel</h2>
            </Layout>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
  /* Check of een gebruiker is ingelogd, indien niet redirecten naar login */
  guestUser( ctx, '/login')

  /* Footer data ophalen */
  const getFooterData = require('../components/footer/FooterData')

  return {
    props: {
      footerData: await getFooterData()
    }
  }
}