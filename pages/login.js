import React from "react";
import { Grid } from "@material-ui/core";

import Layout from '../components/layout'
import Login from '../components/log_register/login'
import Register from '../components/log_register/register'

export default ({footerData}) => {
    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - Login`}>
              <div className='login-container'>
                <Login />
                <Register />
              </div>
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