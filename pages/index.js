import Layout from '../components/layout'
import Homepage from '../components/Homepage'

import axios from 'axios'


export default function Home({footerData, imageList}) {

  return (
    <Layout footerData={footerData} title={`'t Klein Moment`}>
      <Homepage footerData={footerData} imageList={imageList}/>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const getFooterData = require('../components/footer/FooterData')

  const response = await axios.get(`https://wdev.be/wdev_roel/eindwerk/api/images`) 
  const imageList = response.data['hydra:member']

  return {
    props: {
      footerData: await getFooterData(),
      imageList: imageList
    }
  }
}
