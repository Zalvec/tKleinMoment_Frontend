import React from "react";

import Layout from '../components/layout'
import Login from '../components/log_register/login'
import Register from '../components/log_register/register'

export default ({footerData}) => {
    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - Login`}>
                <Login />
                <Register />
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