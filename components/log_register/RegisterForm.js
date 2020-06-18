import { useState } from 'react'
import { Typography, TextField, Button, CircularProgress, Paper } from '@material-ui/core'
import axios from 'axios'
import useLogin from '../../customHooks/useLogin'

export default () => {
    // variabelen setten
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cosplayName, setCosplayName] = useState('')
    const [password, setPassword] = useState('')
    const [ feedbackRegister, setFeedbackRegister ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const { login, feedback } = useLogin()

    // Registratie valideren en verzenden
    const handleRegister = async (e) => {
        e.preventDefault()
        
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

        // Controlleren of alles is ingevuld
        if ( firstName === '' || lastName === '' || email === '' || password === '') {
            setFeedbackRegister('Fill in all required fields')
            return null
        }

        setLoading(true)

        // Registratie verzenden. Bij succes gebruiker inloggen en redirecten naar profiel
        // Bij error een error bericht terugsturen
        try {
            const registerResponse = await axios.post(`https://wdev.be/wdev_roel/eindwerk/api/users`, requestBody, config)
            console.log(registerResponse)
            login(registerResponse.data.email, password)
            setLoading(false)
        } catch (error) {
            console.log(error.response)
            setLoading(false)
            setFeedbackRegister( `Sorry, couldn't register. Please check if all fields are correct` )
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
                <Button className="button" variant="contained" type='submit' fullWidth>
                    Registreer
                </Button>
                { loading && <CircularProgress size="2em" />}
            </form>
        </Paper>
    )
}