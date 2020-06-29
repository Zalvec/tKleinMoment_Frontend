import { useState } from 'react'
import { Typography, TextField, Button, CircularProgress, Paper } from '@material-ui/core'

import useLogin from '../../customHooks/useLogin'
import Message from '../messages/Message'

// Formulier om een gebruiker in te loggen, mist hij reeds een account heeft
export default () => {
    // variabelen setten
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // variabelen ophalen uit login hook
    const { login, feedback, setFeedback, loading } = useLogin()

    // login uitvoeren
    const HandleLogin = async (e) => {
        e.preventDefault()
        login(username, password)
    } 

    return (
        <>
            <Paper className='login-paper'>
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>
                <form noValidate onSubmit={HandleLogin}>
                    <TextField 
                        className='textfield'
                        variant="filled"
                        autoComplete='email'
                        name='email'    
                        required
                        fullWidth
                        label='Email'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                    />
                    <TextField 
                        className='textfield'
                        variant="filled"
                        name='password'
                        label='Wachtwoord'
                        type='password'
                        required
                        fullWidth
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                    />
                    <Button className="button" variant="contained" type='submit' fullWidth>
                        Login
                    </Button>
                    { loading && <CircularProgress className="loading" size="2em" />}
                </form>
            </Paper>
            { feedback !== '' && <Message message={feedback} setMessage={setFeedback} type={'error'} />}
        </>
    )
}