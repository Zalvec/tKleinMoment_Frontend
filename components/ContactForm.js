import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Paper, Typography, CircularProgress, TextField, TextareaAutosize, Button } from '@material-ui/core'
import { parseCookies } from 'nookies'
import EmailValidator from 'email-validator'

export default () => {
    
    // Variabelen setten
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [message, setMessage] = useState('')
    const [feedback, setFeedback] = useState('')
    const [ loading, setLoading ] = useState(false)

    const regexNumber = new RegExp('^(0)[0-9]{9,15}$');
    const regexName = new RegExp('^[a-zA-Z ,.\'-]+$');

    // Als een gebruiker is ingelogd, worden zijn gegevens opgevraagd uit de cookie en onMount in de juiste velden ingevuld
    const cookies = parseCookies()
    const userInfo = Object.keys(cookies).length ? JSON.parse(cookies.userinfo) : null
    useEffect( () => {
        if (userInfo !== null ){
            setEmail(userInfo.username)
            setFirstName(userInfo.firstName)
            setLastName(userInfo.lastName)
        }
    }, [])
    
    // Contact formulier valideren en verzenden
    const handleContactFrom = e => {
        e.preventDefault()

        // Validatie
        if ( firstName === '' || lastName === '' || message === '' || email === '') {  // Alle verplichte velden ingevuld
            setFeedback('Gelieve alle verplichte velden in te vullen')
            return null
        }
        if ( !EmailValidator.validate(email) ) {  // een geldig email ingevuld
            setFeedback('Email is ongeldig')
            return null
        }
        if ( !regexName.test(firstName) || !regexName.test(lastName)){  // Geen speciale tekens in firstname en lastname buiten , . ' en -
            setFeedback('Enkel volgende special characters zijn toegelaten voor voornaam en achternaam: , . \' en -')
            return null
        }
        if ( firstName.length < 2 || firstName.length > 50){  // firstname moet tussen 2 en 50 chatacters lang zijn
            setFeedback('Voornaam moet tussen 2 en 50 characters lang zijn')
            return null
        }
        if ( lastName.length < 2 || lastName.length > 50){   // lastname moet tussen 2 en 50 chatacters lang zijn
            setFeedback('Achtenaam moet tussen 2 en 50 characters lang zijn')
            return null
        }
        if ( phoneNumber.length && !regexNumber.test(phoneNumber)) {   // telefoonnummer mag enkel cijfers bevatten, als het is ingevuld
            setFeedback('Telefoonnummer mag enkel cijfers bevatten en moet tussen 9 en 15 cijfers lang zijn en moet beginnen met een 0')
            return null
        }
        if ( message.length < 20 ){  // het bericht moet minstens 20 characters lang zijn
            setFeedback('Bericht moet minstens 20 characters lang zijn')
            return null
        }
        

        // Gegevens bundelen voor axios
        const requestBody = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber === '' ? null : phoneNumber,
            text: message
        }

        // configuratie voor axios
        const config = {
            'Content-Type': 'application/json',
            'Accept': 'application/ld+json'
        }

        setLoading(true)
        console.log(requestBody)

        // Contact formulier verzenden. Bij succes bericht tonen en alle velden leeg maken
        // Bij error een error bericht terugsturen
        axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}messages`, requestBody, config)
            .then( response => {
                setFeedback('Mail verzonden')
                setPhoneNumber('')
                setMessage('')
                setLoading(false)
            })
            .catch( error  => {
                console.log(error.response)
                setLoading(false)
                setFeedback('Iets ging mis, probeer het later opnieuw')
            })
    }

    return (
        <Paper className="contact-paper">
            <Typography component='h1' variant='h5'>
                Contact formulier
            </Typography>
            <Typography component='h2' variant='body1'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia veritatis exercitationem voluptates, ab voluptate maiores eligendi facilis et deleniti ipsam sit ratione, ullam sed, fuga magnam. Pariatur, distinctio sequi. Repellendus.
            </Typography>
            <Typography component='p' variant='body1'>
                {feedback}
            </Typography>

            {/* noValidate schakelt de standaard veld error messages uit */}
            <form noValidate onSubmit={handleContactFrom}>
                <div>
                    <TextField 
                        className='textfield'
                        autoComplete='email'
                        variant="filled"
                        name='email'
                        required
                        fullWidth
                        label='Email'
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value)
                            setFeedback('')
                        }}
                        InputProps={{ disableUnderline: true }}
                    />
                    <TextField 
                        className='textfield'
                        autoComplete='firstName'
                        variant="filled"
                        name='firstName'
                        required
                        fullWidth
                        label='Voornaam'
                        value={firstName}
                        onChange={e => {
                            setFirstName(e.target.value)
                            setFeedback('')
                        }}
                        InputProps={{ disableUnderline: true }}
                    />
                </div>
                <div>
                    <TextField 
                        className='textfield'
                        autoComplete='lastName'
                        variant="filled"
                        name='lastName'
                        required
                        fullWidth
                        label='Achternaam'
                        value={lastName}
                        onChange={e => {
                            setLastName(e.target.value)
                            setFeedback('')
                        }}
                        InputProps={{ disableUnderline: true }}
                    />
                    <TextField 
                        className='textfield'
                        autoComplete='phoneNumber'
                        variant="filled"
                        name='phoneNumber'
                        fullWidth
                        label='Telefoonnummer'
                        value={phoneNumber}
                        onChange={e => {
                            setPhoneNumber(e.target.value)
                            setFeedback('')
                        }}
                        InputProps={{ disableUnderline: true }}
                    />
                </div>
                
                <TextareaAutosize 
                    placeholder="Uw bericht of vraag hier..."
                    label='Message'
                    value={message}
                    onChange={e => {
                        setMessage(e.target.value)
                        setFeedback('')
                    }}
                    required
                    rowsMin={4}
                />
                <Button className="button" variant="contained" type='submit'>
                        Bericht verzenden
                </Button>
            </form>
            <div className='loading'>
                { loading && <CircularProgress size="2em" />}
            </div>
        </Paper>
    )
}
