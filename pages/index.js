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

// Uitvoeren on build time en returnen aan de export default hierboven
export const getStaticProps = async () => {
  /* Footer data ophalen */
  const getFooterData = require('../components/footer/FooterData')

  /* Alle images die in een album zitten opvragen */
  const response = await axios.get(`https://wdev.be/wdev_roel/eindwerk/api/images`) 
  const imageList = response.data['hydra:member']

  return {
    props: {
      footerData: await getFooterData(),
      imageList: imageList
    }
  }
}
