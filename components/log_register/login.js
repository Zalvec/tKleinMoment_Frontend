import { useState } from 'react'
import { Typography, Grid, Container, TextField, Button, CircularProgress, CssBaseline, Paper } from '@material-ui/core'

import useSecurity from '../../useSecurity'

export default () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, feedback, loading } = useSecurity()
    const handleLogin = e => {
        e.preventDefault()
        login(username, password)
    } 
    return (
        <>
            <Paper className='login-paper'>
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>
                <Typography component='h2' variant='p'>
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
                    />
                    <Button className="button" variant="contained" type='submit' fullWidth>
                        Login
                    </Button>
                    { loading && <CircularProgress size="2em" />}
                </form>
            </Paper>

            {/* <div className='form'>
                <h1 className='title'>Login</h1>
                <h2 className='feedback'>{feedback}</h2>
                <form className='login-form' onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" value={username} onChange={e => setUsername(e.target.value)}/>
                    <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="submit" value="login" />
                </form>
                <div className='loading'>
                    { loading && <CircularProgress size="2em" />}
                </div>
            </div> */}
        </>
    )
}