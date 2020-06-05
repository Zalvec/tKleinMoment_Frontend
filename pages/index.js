import Layout from '../components/layout'
import Homepage from '../components/Homepage'


export default function Home({footerData}) {

  return (
    <Layout footerData={footerData} title={`'t Klein Moment`}>
      <Homepage footerData={footerData}/>
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
