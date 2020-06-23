import { useState } from 'react'
import { Paper, Typography, TextField, Button, InputAdornment, CircularProgress } from "@material-ui/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../fontAwesome/fontAwesome'
import { confirmAlert } from 'react-confirm-alert'
import axios from 'axios'

import useLogin from '../../customHooks/useLogin'
import LoginForm from '../log_register/LoginForm'
import {logout} from '../../helpers/helpers'

export default ({userData:{userData, jwt}}) => {
    console.log(jwt)
    // Gebruikers data opsplitsen
    console.log(JSON.parse(userData))
    const userInfo = JSON.parse(userData)

    //variabelen setten
    const [ email, setEmail] = useState(userInfo.username)
    const [ cosplayName, setCosplayName ] = useState(userInfo.cosplay === null ? '' : userInfo.cosplay)
    const [ password, setPassword ] = useState('')
    const [ repeatPassword, setRepeatPassword ] = useState('') 
    const [ feedback, setFeedback ] = useState('')
    const [ loading, setLoading ] = useState(false)

    // Veranderingen opslaan
    // TODO - uitwerken
    const HandleProfileChanges = (e) => {
        e.preventDefault()
        if ( password !== repeatPassword ) setFeedback('Password needs to be te same')
        
        const requestBody = {
            email: email,
            cosplayName: cosplayName === '' ? null : cosplayName,
            password: password === '' ? null : password
        }

        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Accept' : 'application/ld+json',
                'Content-Type': 'application/json'
            }
        }
        console.log(config)
        setLoading(true)

        axios.put(`https://wdev.be/wdev_roel/eindwerk/api/users/${userInfo.id}`, requestBody, config)
            .then( response => {
                console.log(response)
                setLoading(false)
                setFeedback('Account gewijzigd')
                // TODO nieuwe jwt aanmaken zodat data uptodate is
            })
            .catch( error => {
                console.log(error.response)
                setLoading(false)
            })

    }

    // Account verwijderen
    // TODO - afwerken
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

    const DeleteAccount = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Accept' : 'application/ld+json',
                'Content-Type': 'application/json'
            }
        }

        setLoading(true)

        axios.delete(`https://wdev.be/wdev_roel/eindwerk/api/users/${userInfo.id}`, config)
            .then( response => {
                console.log(response)
                setLoading(false)
                setFeedback('Account is verwijderd, je wordt geredirect naar de homepage')
                logout()
            })
            .catch( error => {
                console.log(error.response)
                setLoading(false)
            })
    }

    return (
        <Paper className='profiel-paper' elevation={0}>
            <Typography component='h1' variant='h5'>Profiel</Typography>

            <div className='profiel-fields'>
                <div>
                    <TextField
                        className='textfield'
                        disabled={true}
                        variant="filled"
                        fullWidth
                        label='Naam'
                        value={userInfo.name}
                        InputProps={{ 
                            disableUnderline: true,
                            endAdornment: <InputAdornment position="end">
                                <FontAwesomeIcon icon="user" />
                                </InputAdornment>
                        }}
                    />
                    <TextField
                        className='textfield'
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
                <form noValidate onSubmit={HandleProfileChanges}>
                    <Typography component='h2' variant='body1'>Wijzig account</Typography>
                    <div>
                        <TextField
                            className='textfield'
                            autoComplete='email'
                            variant="filled"
                            fullWidth
                            label='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            InputProps={{ 
                                disableUnderline: true,
                                endAdornment: <InputAdornment position="end">
                                    <FontAwesomeIcon icon="envelope" />
                                    </InputAdornment>
                             }}
                        />
                        <TextField
                            className='textfield'
                            autoComplete='cosplayName'
                            variant='filled'
                            name='cosplayName'
                            fullWidth
                            label='Cosplay naam'
                            value={cosplayName}
                            onChange={e => setCosplayName(e.target.value)}
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
                            className='textfield'
                            variant="filled"
                            name='password'
                            label='Wachtwoord'
                            type='password'
                            fullWidth
                            value={password}
                            onChange={e => setPassword(e.target.value)}
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
                            onChange={e => setRepeatPassword(e.target.value)}
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
                <Typography component='p' variant='body1'>
                    {feedback}
                </Typography>
                <Button className="button" variant="contained" type='submit' fullWidth onClick={HandleDeleteAccount}>
                    Account verwijderen
                </Button>
            </div>
        </Paper>
    )
}