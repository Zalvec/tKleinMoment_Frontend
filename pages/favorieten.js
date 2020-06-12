import Layout from '../components/layout'

export default (props) => {
    return (
        <>
            <Layout footerData={props.footerData} title={`'t Klein Moment - Favorieten`}>
                <h2>Favorieten</h2>
                {/* TODO: overview of liked images*/}
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