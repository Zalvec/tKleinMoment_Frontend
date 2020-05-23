import { useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import JWT from 'jsonwebtoken'

export default () => {
    const [feedback, setFeedback] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect( () => {
        const localToken = localStorage.getItem('token') || undefined
        // TODO: what do you do if token is expired??
        if (localToken) {
            setToken(localToken)
            const decoded = JWT.decode(localToken, { complete: true })
            // setUserId( parseInt( decoded.payload.security.userid ))
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
            const loginResponse = await axios.post(`https://wdev.be/wdev_roel/eindwerk/api/login`, requestBody, config)
            console.log(loginResponse)
            const jwt = loginResponse.data.token
            localStorage.setItem('token', jwt)
            const decoded = JWT.decode(jwt, { complete: true })
            // setUserId( parseInt( decoded.payload.security.userid ))
            setToken(jwt)
            setIsLoggedIn(true)
            Router.push('/')
        } catch (error) {
            console.log(error)
            setFeedback("Wrong username or password provided")
            localStorage.removeItem('token')
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
    return { isLoggedIn, token, login, feedback, logout, userId}
}