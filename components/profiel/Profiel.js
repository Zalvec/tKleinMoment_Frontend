import { useState } from 'react'
import { Paper, Typography, TextField, Button, InputAdornment, CircularProgress } from "@material-ui/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../fontAwesome/fontAwesome'
import { confirmAlert } from 'react-confirm-alert'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { setCookie } from 'nookies'

import {logout} from '../../helpers/helpers'
import Message from '../messages/Message'

// Profiel pagina waar een gebruik zijn gegevens kan bekijken
// Cosplaynaam en wachtwoord kunnen ze wijzigen
export default ({userData:{userData, refreshtoken, jwt}}) => {
    // Gebruikers data opsplitsen
    const userInfo = JSON.parse(userData)

    //variabelen setten
    const [ email, setEmail] = useState(userInfo.email)
    const [ cosplayName, setCosplayName ] = useState(userInfo.cosplay === null ? '' : userInfo.cosplay)
    const [ password, setPassword ] = useState('')
    const [ repeatPassword, setRepeatPassword ] = useState('') 
    const [ feedback, setFeedback ] = useState('')
    const [ confirmation, setConfirmation ] = useState('')
    const [ loading, setLoading ] = useState(false)

    // Regular erpressions definiëren
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    const regexName = new RegExp('^[a-zA-Z0-9 ,.\'-]+$');

    // Veranderingen opslaan
    const HandleProfileChanges = (e) => {
        e.preventDefault()
        
        // Controleer ieder veld
        if ( cosplayName ) {
            if ( !regexName.test(cosplayName)){   // controlleer of de cosplay naam een speciale karakters bevat
                setFeedback('Enkel volgende special characters zijn toegelaten voor je cosplay naam: , . \' -')
                return null
            }
            if ( cosplayName.length < 2 || cosplayName.length > 50){ // cosplay naam moet tussen 2 en 50 chatacters lang zijn
                setFeedback('Cosplay naam moet tussen 2 en 50 characters lang zijn')
                return null
            }
        }
        
        if ( password !== '' || repeatPassword !== '' ) {
            if (password !== repeatPassword ){ // beide wachtwoorden moeten gelijk zijn
                setFeedback('Wachtwoorden zijn niet gelijk')
                return null
            } 
            if ( !strongRegex.test(password) ){ // wachtwoord moet sterk genoeg zijn. 8 lang, 1 getal, kleine en grote letter
                setFeedback('Wachtwoord moet minstens 8 characters lang zijn met minstens 1 kleine letter, 1 grote letter en een getal')
                return null
            }
        }
        
        const requestBody = {
            email: email,
            cosplayName: cosplayName === '' ? null : cosplayName, // Als cosplayName leeg is, omzetten naar null. API verwacht null ipv ''
            password: password === '' ? null : password // Als password leeg is, omzetten naar null. API verwacht null ipv ''
        }

        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Accept' : 'application/ld+json',
                'Content-Type': 'application/json'
            }
        }

        setLoading(true)

        axios.put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/${userInfo.id}`, requestBody, config)
            .then( response => {
                setLoading(false)
                setConfirmation('Account gewijzigd')
                setPassword('')
                setRepeatPassword('')
                // jwt refreshen aanmaken zodat data uptodate is
                axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}token/refresh`, { refresh_token:`${refreshtoken}`})
                    .then(res => {
                        // Na refresh van jwt de data in de oude cookies overschrijven
                        const jwtToken = res.data.token
                        const decoded = jwt_decode( jwtToken )
                        // cookie updaten met jwtToken
                        setCookie(null, 'jwtToken', jwtToken, {
                            path: "/",
                            sameSite: "lax",
                            maxAge: 60 * 60
                        })
                        // cookie updaten met refreshtoken
                        setCookie(null, 'refreshtoken', res.data.refresh_token, {
                            path: "/",
                            sameSite: "lax",
                            maxAge: 60 * 60 * 60
                        })
                        // cookie updaten met gebruikers informatie
                        setCookie(null, 'userinfo', JSON.stringify(decoded), {
                            path: "/",
                            sameSite: "lax",
                            maxAge: 60 * 60
                        })
                    })
                    .catch ( err => {
                        setLoading(false)
                    })
            })
            .catch( error => {
                setLoading(false)
                if ( error.response.status === 400 && error.response.data['hydra:description'] === 'cosplayName: Er bestaat reeds een gebruiker met deze cosplay naam.') {
                    setFeedback('Er bestaat reeds een gebruiker met deze cosplay naam')
                } 
                else setFeedback('Sorry er ging iets mis, probeer later opnieuw')
                console.log(error.response)
            })

    }

    // Popup met bevestiging om account te verwijderen of niet
    const HandleDeleteAccount = (e) => {
        e.preventDefault()
        confirmAlert({
            title: 'Account verwijderen?',
            message: 'Eens je account verwijderd is, is dit onomkeerbaar. Ben je zeker dat je je account wil verwijderen?',
            buttons: [
                {
                    label: 'Ja',
                    onClick: () => DeleteAccount()
                },
                {
                    label: 'Nee'
                }
            ]
        });
    }

    // Account verwijderen
    const DeleteAccount = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Accept' : 'application/ld+json',
                'Content-Type': 'application/json'
            }
        }

        setLoading(true)

        axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/${userInfo.id}`, config)
            .then( response => {
                setLoading(false)
                setConfirmation('Account is verwijderd, je wordt geredirect naar de homepage')
                logout()
            })
            .catch( error => {
                setLoading(false)
                setFeedback('Je account kon niet verwijderd worden. Probeer later opnieuw of neem contact op met de fotograaf.')
            })
    }

    return (
        <>
            <Paper className='profiel-paper' elevation={0}>
                <Typography component='h1' variant='h5'>Profiel</Typography>
                <div className='profiel-fields'>
                    <div>
                        <TextField
                            className='textfield first-field'
                            disabled={true}
                            variant="filled"
                            fullWidth
                            label='Naam'
                            value={userInfo.firstName + ' ' + userInfo.lastName}
                            InputProps={{ 
                                disableUnderline: true,
                                endAdornment: <InputAdornment position="end">
                                    <FontAwesomeIcon icon="user" />
                                    </InputAdornment>
                            }}
                        />
                        <TextField
                            className='textfield memberSince'
                            variant="filled"
                            disabled={true}
                            fullWidth
                            label='Duur sinds registratie'
                            value={userInfo.membershipDuration}
                            InputProps={{ 
                                disableUnderline: true,
                                endAdornment: <InputAdornment position="end">
                                    <FontAwesomeIcon icon="calendar-alt" />
                                    </InputAdornment>
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            className='textfield'
                            autoComplete='email'
                            variant="filled"
                            fullWidth
                            disabled={true}
                            label='Email'
                            value={email}
                            InputProps={{ 
                                disableUnderline: true,
                                endAdornment: <InputAdornment position="end">
                                    <FontAwesomeIcon icon="envelope" />
                                    </InputAdornment>
                                }}
                        />
                    </div>
                    <form noValidate onSubmit={HandleProfileChanges}>
                        <Typography component='h2' variant='body1'>Wijzig account</Typography>
                        <div>
                            <TextField
                                className='textfield'
                                autoComplete='cosplayName'
                                variant='filled'
                                name='cosplayName'
                                fullWidth
                                label='Cosplay naam'
                                value={cosplayName}
                                onChange={e => {
                                    setCosplayName(e.target.value)
                                    setFeedback('')
                                    setConfirmation('')
                                }}
                                InputProps={{ 
                                    disableUnderline: true,
                                    endAdornment: <InputAdornment position="end">
                                        <FontAwesomeIcon icon="user" />
                                        </InputAdornment> 
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                className='textfield first-field'
                                variant="filled"
                                name='password'
                                label='Wachtwoord'
                                type='password'
                                fullWidth
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                    setFeedback('')
                                    setConfirmation('')
                                }}
                                InputProps={{ 
                                    disableUnderline: true,
                                    endAdornment: <InputAdornment position="end">
                                        <FontAwesomeIcon icon="lock" />
                                        </InputAdornment> 
                                }}
                            />
                            <TextField
                                className='textfield'
                                variant="filled"
                                name='repeatPassword'
                                label='Herhaal wachtwoord'
                                type='password'
                                fullWidth
                                value={repeatPassword}
                                onChange={e => {
                                    setRepeatPassword(e.target.value)
                                    setFeedback('')
                                    setConfirmation('')
                                }}
                                InputProps={{ 
                                    disableUnderline: true,
                                    endAdornment: <InputAdornment position="end">
                                        <FontAwesomeIcon icon="lock" />
                                        </InputAdornment>
                                }}
                            />
                        </div>
                        <Button className="button" variant="contained" type='submit' fullWidth>
                            Wijzigingen opslaan
                        </Button>  
                    </form>
                    <span className='loading'>
                        { loading && <CircularProgress size="2em" />}
                    </span>
                    <Button className="button" variant="contained" type='submit' fullWidth onClick={HandleDeleteAccount}>
                        Account verwijderen
                    </Button>
                </div>
            </Paper>
            { feedback !== '' && <Message setMessage={setFeedback} message={feedback} type={'error'} />}
            { confirmation !== '' && <Message setMessage={setConfirmation} message={confirmation} type={'success'} />}
        </>
    )
}