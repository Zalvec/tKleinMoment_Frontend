import React from "react";

import Layout from '../components/layout'
import Login from '../components/log_register/LoginForm'
import Register from '../components/log_register/RegisterForm'
import { loggedUser } from '../helpers/helpers'

// Pagina waar gebruikers zich kunnen inloggen of registreren
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

export const getServerSideProps = async (ctx) => {
  /* Check of een gebruiker is ingelogd, indien ja redirecten naar profiel */
  loggedUser( ctx, '/profiel')

  /* Footer data ophalen */
  const getFooterData = require('../components/footer/FooterData')

  return {
    props: {
      footerData: await getFooterData()
    }
  }
}