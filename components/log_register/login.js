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
            {/* <Paper className='paper'>
                <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    <Typography component='h1' variant='h5'>
                        Login
                    </Typography>
                    <Typography component='h1' variant='h5'>
                        {feedback}
                    </Typography>
                    <form noValidate onSubmit={handleLogin}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='email'
                                    name='email'    
                                    required
                                    fullWidth
                                    label='Email'
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    name='password'
                                    label='Password'
                                    type='password'
                                    required
                                    fullWidth
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button type='submit' fullWidth>
                            Login
                        </Button>
                        { loading && <CircularProgress size="2em" />}
                    </form>
                </Container>
            </Paper> */}

            <div className='form'>
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
            </div>
        </>
    )
}