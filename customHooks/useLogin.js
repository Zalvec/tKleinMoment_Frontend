import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { setCookie } from 'nookies'
import Router from 'next/router'
import { useState } from 'react'
import EmailValidator from 'email-validator'

export default () => {
    // variabelen aanmaken
    const [feedback, setFeedback] = useState('')
    const [loading, setLoading] = useState(false)

    // login functie
    const login = async (username, password) => {
        // login gegevens
        const credentials = { 
            email: username, 
            password: password
        }

        // configuratie voor axios
        const config = {
            'Content-Type': 'application/json'
        }
    
        // validatie velden
        if (username === "" || password === "") {  // beide velden ingevuld
            setFeedback('Gelieve alle verplichte velden in te vullen')
            return null
        }
        if ( !EmailValidator.validate(username) ) {  // een geldig email ingegeven
            setFeedback('Email is ongeldig')
            return null
        }
    
        setLoading(true)
        
        // login versturen naar api. Indien de user kan inloggen worden de nodige cookies aangemaakt. Anders krijgt de user een error message
        try {
            const loginResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}login_check`, credentials, config)
            const jwtToken = loginResponse.data.token
            console.log(loginResponse)
            const decoded = jwt_decode( jwtToken )
            console.log(decoded)
            // cookie aanmaken met jwtToken
            setCookie(null, 'jwtToken', jwtToken, {
                path: "/",
                sameSite: "lax",
                maxAge: 60 * 60
            })

            // cookie aanmaken met refreshtoken
            setCookie(null, 'refreshtoken', loginResponse.data.refresh_token, {
                path: "/",
                sameSite: "lax",
                maxAge: 60 * 60 * 60
            })

            // cookie aanmaken met gebruikers informatie
            setCookie(null, 'userinfo', JSON.stringify(decoded), {
                path: "/",
                sameSite: "lax",
                maxAge: 60 * 60
            })
            
            Router.push("/profiel");
            setLoading(false)
        } catch (error) {
            console.log(error.response)
            setFeedback( `Sorry, niet in staat in te loggen. Controleer of email en wachtwoord correct zijn` )
            setLoading(false)
        }
    }

    // functie login en variablen returnen
    return { login, feedback, loading}
} 