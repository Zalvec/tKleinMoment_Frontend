import { useState, useEffect } from 'react'
import { Typography, TextField, Button, CircularProgress, Paper, Checkbox, FormControlLabel } from '@material-ui/core'
import axios from 'axios'
import useLogin from '../../customHooks/useLogin'
import EmailValidator from 'email-validator'

import Message from '../messages/Message'

// Formulier om een gebruiker zich te registreren
export default () => {
    // variabelen setten
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cosplayName, setCosplayName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [ feedbackRegister, setFeedbackRegister ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ checked, setChecked ] = useState(false)
    const { login, feedback } = useLogin()

    const regexName = new RegExp('^[a-zA-Z ,.\'-]+$');
    const regexCosplayName = new RegExp('^[a-zA-Z0-9 ,.\'-]+$');
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    const checkboxText = ( <span>Ik ga akkoord met <a href='/gdpr' target='_black'>GDPR</a> en de <a href='/algemene-voorwaarden' target='_black'>algemene voorwaarden</a>.</span> )
    
    const HandleChangeCheck = () => {
        setChecked(!checked)
        setFeedbackRegister('')
    }

    useEffect( () => {
        setFeedbackRegister(feedback)
    }, [feedback])

    // Registratie valideren en verzenden
    const handleRegister = async (e) => {
        e.preventDefault()
                
        // Controlleren of alles is ingevuld
        if ( firstName === '' || lastName === '' || email === '' || password === '' || repeatPassword === '') {
            setFeedbackRegister('Gelieve alle verplichte velden in te vullen')
            return null
        }

        // Controleer ieder veld
        if ( !EmailValidator.validate(email) ) { // een geldig email ingevuld
            setFeedbackRegister('Email is ongeldig')
            return null
        }
        if ( !regexName.test(firstName) || !regexName.test(lastName)){  // Geen speciale tekens in firstname en lastname buiten , . ' en -
            setFeedbackRegister('Enkel letters en volgende special characters zijn toegelaten voor voornaam en achternaam: , . \' -')
            return null
        }
        if ( firstName.length < 2 || firstName.length > 50){ // firstname moet tussen 2 en 50 chatacters lang zijn
            setFeedbackRegister('Voornaam moet tussen 2 en 50 characters lang zijn')
            return null
        }
        if ( lastName.length < 2 || lastName.length > 50){ // lastname moet tussen 2 en 50 chatacters lang zijn
            setFeedbackRegister('Achtenaam moet tussen 2 en 50 characters lang zijn')
            return null
        }
        if ( cosplayName && !regexCosplayName.test(cosplayName) ) { // indien er een cosplay naam is opgegeven deze controlleren dat deze geen speciale karakters bevat buiten , . ' en -
            setFeedbackRegister('Enkel volgende special characters zijn toegelaten voor je cosplay naam: , . \' -')
            return null
        }
        if ( password !== repeatPassword ){  // beide wachtwoorden moeten gelijk zijn
            setFeedbackRegister('Wachtwoorden zijn niet gelijk')
            return null
        }
        if ( !strongRegex.test(password) ){ // wachtwoord moet sterk genoeg zijn. 8 lang, 1 getal, kleine en grote letter
            setFeedbackRegister('Wachtwoord moet minstens 8 characters lang zijn met minstens 1 kleine letter, 1 grote letter en een getal')
            return null
        }

        // Is checkbox checked
        if ( checked === false ) {
            setFeedbackRegister('Gelieve de checkbox aanvinken voor akkoord om te kunnen registreren')
            return null
        }

        // Gegevens bundelen voor axios
        const requestBody = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            cosplayName: (cosplayName === '') ? null : cosplayName, // Als cosplayName leeg is, omzetten naar null. API verwacht null ipv ''
            password: password
        }

        // configuratie voor axios
        const config = {  'Content-Type': 'application/json' }

        setLoading(true)

        // Registratie verzenden. Bij succes gebruiker inloggen en redirecten naar profiel
        // Bij error een error bericht terugsturen
        try {
            const registerResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users`, requestBody, config)
            login(registerResponse.data.email, password)
            setLoading(false)
        } catch (error) {
            console.log(error.response)
            if ( error.response.status === 400 ){
                if ( error.response.data['hydra:description'] === 'cosplayName: Er bestaat reeds een gebruiker met deze cosplay naam.') {
                    setFeedback('Er bestaat reeds een gebruiker met deze cosplay naam')
                }
                if ( error.response.data['hydra:description'] === 'email: Er bestaat reeds een gebruiker met dit emailadres.') {
                    setFeedback(`${email} is reeds in gebruik`)
                }
            } else {
                setFeedbackRegister( `Sorry, niet in staat in te registreren. Controleer of alle verplichte velden correct zijn ingevuld` )
            }
            setLoading(false)
        }
    } 
    return (
        <Paper className='register-paper'>
            <Typography component='h1' variant='h5'>
                Registreer
            </Typography>
            <form noValidate onSubmit={handleRegister}>
                <TextField 
                    variant="filled"
                    className='textfield'
                    autoComplete='email'
                    name='email'    
                    required
                    fullWidth
                    label='Email'
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value)
                        setFeedbackRegister('')
                    }}
                    InputProps={{ disableUnderline: true }}
                />
                <TextField 
                    variant="filled"
                    className='textfield'
                    autoComplete='fname'
                    name='firstName'    
                    required
                    fullWidth
                    label='Voornaam'
                    value={firstName}
                    onChange={e => {
                        setFirstName(e.target.value)
                        setFeedbackRegister('')
                    }}
                    InputProps={{ disableUnderline: true }}
                />
                <TextField 
                    variant="filled"
                    className='textfield'
                    autoComplete='lname'
                    name='lastName'    
                    required
                    fullWidth
                    label='Achternaam'
                    value={lastName}
                    onChange={e => {
                        setLastName(e.target.value)
                        setFeedbackRegister('')
                    }}
                    InputProps={{ disableUnderline: true }}
                />
                <TextField 
                    variant="filled"
                    className='textfield'
                    autoComplete='cname'
                    name='cosplayName'    
                    fullWidth
                    label='Cosplay naam'
                    value={cosplayName}
                    onChange={e => {
                        setCosplayName(e.target.value)
                        setFeedbackRegister('')
                    }}
                    InputProps={{ disableUnderline: true }}
                />
                <TextField 
                    variant="filled"
                    className='textfield'
                    name='password'
                    label='Wachtwoord'
                    type='password'
                    required
                    fullWidth
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
                        setFeedbackRegister('')
                    }}
                    InputProps={{ disableUnderline: true }}
                />
                <TextField 
                    variant="filled"
                    className='textfield'
                    name='repeatPassword'
                    label='Herhaal wachtwoord'
                    type='password'
                    required
                    fullWidth
                    value={repeatPassword}
                    onChange={e => {
                        setRepeatPassword(e.target.value)
                        setFeedbackRegister('')
                    }}
                    InputProps={{ disableUnderline: true }}
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={checked}
                        onChange={HandleChangeCheck}
                    />
                    }
                    label={checkboxText}
                />
                <Button className="button" variant="contained" type='submit' fullWidth>
                    Registreer
                </Button>
                { loading && <CircularProgress className="loading" size="2em" />}
            </form>
            { feedbackRegister !== '' && <Message message={feedbackRegister} setMessage={setFeedbackRegister} type={'error'} />}
        </Paper>
    )
}