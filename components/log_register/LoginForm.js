import { useState } from 'react'
import { Typography, TextField, Button, CircularProgress, Paper } from '@material-ui/core'
import useLogin from '../../customHooks/useLogin'

export default () => {
    // variabelen setten
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // variabelen ophalen uit login hook
    const { login, feedback, loading } = useLogin()

    // login uitvoeren
    const handleLogin = async (e) => {
        e.preventDefault()
        login(username, password)
    } 

    return (
        <>
            <Paper className='login-paper'>
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>
                <Typography component='h2' variant='body1'>
                    {feedback}
                </Typography>
                <form noValidate onSubmit={handleLogin}>
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
                        label='Password'
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
                    { loading && <CircularProgress size="2em" />}
                </form>
            </Paper>
        </>
    )
}