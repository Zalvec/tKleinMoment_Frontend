import React from "react";
import Head from 'next/head'

import Layout from '../components/layout'
import Login from '../components/log_register/login'
import Register from '../components/log_register/register'

export default () => {
    return (
        <>
            <Head>
                <title>'t Klein Moment - Login</title>
            </Head>
            <Layout>
                <h2>Login</h2>
                <Login />

                <h2>Register</h2>
                <Register />
            </Layout>
        </>
    )
}