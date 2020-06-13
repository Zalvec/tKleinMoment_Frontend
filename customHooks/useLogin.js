import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { setCookie } from 'nookies'
import Router from 'next/router'
import { useState } from 'react'

export default () => {
    // variabelen aanmaken
    const [feedback, setFeedback] = useState('')
    const [loading, setLoading] = useState(false)

    // login functie
    const login = async (username, password) => {
        // login gegevens
        const credentials = { 
            username: username, 
            password: password
        }

        // configuratie voor axios
        const config = {
            'Content-Type': 'application/json'
        }
    
        // verifiëren of alles is ingevuld
        if (username === "" || password === "") {
            setFeedback('Fill in all required fields')
            return null
        }
    
        setLoading(true)
        
        // login versturen naar api. Indien de user kan inloggen worden de nodige cookies aangemaakt. Anders krijgt de user een error message
        try {
            const loginResponse = await axios.post(`https://wdev.be/wdev_roel/eindwerk/api/login_check`, credentials, config)
            const jwtToken = loginResponse.data.token
            const decoded = jwt_decode( jwtToken )
            setCookie(null, 'jwtToken', jwtToken, {
                path: "/",
                sameSite: "lax",
                maxAge: 60 * 60
            })
            setCookie(null, 'userid', decoded.id)
            setLoading(false)
            Router.push("/profiel");
        } catch (error) {
            console.log(error)
            setFeedback( `Sorry, couldn't login. Please check if email and password are correct` )
            setLoading(false)
        }
    }

    // functie login en variablen returnen
    return { login, feedback, loading}
} 