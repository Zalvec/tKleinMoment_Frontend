import React from "react";

import Layout from '../components/layout'
import Login from '../components/log_register/login'
import Register from '../components/log_register/register'

export default () => {
    return (
        <Layout>
            <h2>Login</h2>
            <Login />

            <h2>Register</h2>
            <Register />
        </Layout>
    )
}