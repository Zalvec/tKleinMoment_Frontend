import Layout from '../components/layout'

export default (props) => {
    return (
        <>
            <Layout footerData={props.footerData} title={`'t Klein Moment - Favorieten`}>
                <h2>Favorieten</h2>
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