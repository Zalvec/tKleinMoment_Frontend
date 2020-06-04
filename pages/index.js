import useSecurity from '../useSecurity'
import Layout from '../components/layout'


export default function Home({footerData}) {
  const { isLoggedIn } = useSecurity()

  return (
    <Layout footerData={footerData} title={`'t Klein Moment`}>
      <div className="container">

        <main>
          <h1>Start of 't Klein Moment</h1>
          {isLoggedIn && <p>INGELOGD</p> || <p>BEZOEKER</p>}
        </main>
        
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const getFooterData = require('../helpers/footerData')

  return {
    props: {
      footerData: await getFooterData()
    }
  }
}
