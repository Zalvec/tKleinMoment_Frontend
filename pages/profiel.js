import Layout from '../components/Layout'
import { guestUser } from '../helpers/helpers'
import Profiel from '../components/profiel/Profiel'

export default ({footerData, userData}) => {
    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - Profiel`}>
                <Profiel userData={userData} />
            </Layout>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
  /* Check of een gebruiker is ingelogd, indien niet redirecten naar login */
  guestUser( ctx, '/login')

  /* Footer data ophalen */
  const getFooterData = require('../components/footer/FooterData')

  /* Gebruikers informatie ophalen */
  const getUserData = require('../components/profiel/ProfielData')

  return {
    props: {
      footerData: await getFooterData(),
      userData: await getUserData(ctx)
    }
  }
}