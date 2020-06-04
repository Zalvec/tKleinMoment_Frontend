import { useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import JWT from 'jsonwebtoken'

export default () => {
    const [feedback, setFeedback] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(null)

    useEffect( () => {
        const localToken = localStorage.getItem('token') || undefined
        // TODO: what do you do if token is expired??
        if (localToken) {
            setToken(localToken)
            setIsLoggedIn(true)
        }
    }, [])

    const login = async (username, password) => {
        const requestBody = {
            username: username,
            password: password
        }
        const config = {
            'Content-Type': 'application/json'
        }
        try {
            const loginResponse = await axios.post(`https://wdev.be/wdev_roel/eindwerk/api/login_check`, requestBody, config)
            const jwt = loginResponse.data.token
            localStorage.setItem('token', jwt)
            const decoded = JWT.decode(jwt, { complete: true })
            // TODO: more info to payload is added
            console.log(decoded)
            setToken(jwt)
            setIsLoggedIn(true)
            Router.push('/')
        } catch (error) {
            console.log(error)
            setFeedback("Wrong username or password provided")
        }
    }

    const register = async ( email, firstName, lastName, cosplayName = null, password) => {
        const requestBody = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            cosplayName: cosplayName,
            password: password
        }
        const config = {
            'Content-Type': 'application/json'
        }
        try {
            const registerResponse = await axios.post(`https://wdev.be/wdev_roel/eindwerk/api/users`, requestBody, config)
            console.log(registerResponse)
            login(registerResponse.data.email, password)
        } catch (error) {
            console.log(error)
            setFeedback("Couldn't register")
        }
    }

    const logout = () => {
        try {
            localStorage.removeItem('token')
            Router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return { isLoggedIn, token, login, feedback, logout, register}
}