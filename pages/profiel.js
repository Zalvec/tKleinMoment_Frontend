import Layout from '../components/layout'

export default (props) => {
    return (
        <>
            <Layout footerData={props.footerData} title={`'t Klein Moment - Profiel`}>
                <h2>Profiel</h2>
            </Layout>
        </>
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