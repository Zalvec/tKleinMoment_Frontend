import { useState } from 'react'
import { Typography, TextField, Button, CircularProgress, Paper, Checkbox, FormControlLabel } from '@material-ui/core'
import axios from 'axios'
import useLogin from '../../customHooks/useLogin'
import EmailValidator from 'email-validator'

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
    const { login, feedback } = useLogin()
    const [ checked, setChecked ] = useState(false)

    const regexName = new RegExp('^[a-zA-Z ,.\'-]+$');
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    const checkboxText = ( <span>Ik ga akkoord met <a href='/gdpr' target='_black'>GDPR</a> en de <a href='/algemene-voorwaarden' target='_black'>algemene voorwaarden</a>.</span> )
    
    const HandleChangeCheck = () => {
        setChecked(!checked)
        setFeedbackRegister('')
    }

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
            setFeedback('Enkel volgende special characters zijn toegelaten voor voornaam en achternaam: , . \' -')
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
        const config = {
            'Content-Type': 'application/json'
        }

        setLoading(true)

        // Registratie verzenden. Bij succes gebruiker inloggen en redirecten naar profiel
        // Bij error een error bericht terugsturen
        try {
            const registerResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users`, requestBody, config)
            console.log(registerResponse)
            login(registerResponse.data.email, password)
            setLoading(false)
        } catch (error) {
            console.log(error.response)
            if ( error.response.status === 400 ){
                setFeedbackRegister(`${email} is reeds in gebruik`)
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
            <Typography component='h2' variant='body1'>
                {feedback}{feedbackRegister}
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
        </Paper>
    )
}