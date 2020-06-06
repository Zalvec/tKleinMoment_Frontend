import { useState } from 'react'
import { Typography, Grid, Container, TextField, Button, CircularProgress, CssBaseline, Paper } from '@material-ui/core'

import useSecurity from '../../useSecurity'

export default () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cosplayName, setCosplayName] = useState('')
    const [password, setPassword] = useState('')
    const { register, feedback, loading } = useSecurity()
    const handleRegister = e => {
        e.preventDefault()
        if (cosplayName !== '') register( email, firstName, lastName, cosplayName, password )
        if (cosplayName === '') register( email, firstName, lastName, null, password )
    } 
    return (
        <>
            {/* <Paper className='paper'>
                <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    <Typography component='h1' variant='h5'>
                        Register
                    </Typography>
                    <Typography component='h1' variant='h5'>
                        {feedback}
                    </Typography>
                    <form noValidate onSubmit={handleRegister}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='email'
                                    name='email'    
                                    required
                                    fullWidth
                                    label='Email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='fname'
                                    name='firstName'    
                                    required
                                    fullWidth
                                    label='First name'
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='lname'
                                    name='lastName'    
                                    required
                                    fullWidth
                                    label='Last name'
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='cname'
                                    name='cosplayName'    
                                    fullWidth
                                    label='Cosplay name'
                                    value={cosplayName}
                                    onChange={e => setCosplayName(e.target.value)}
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
                            Register
                        </Button>
                        { loading && <CircularProgress size="2em" />}
                    </form>
                </Container>
            </Paper> */}

            <div className='form'>
                <h1 className='title'>Register</h1>
                <h2 className='feedback'>{feedback}</h2>
                <form className='login-form' onSubmit={handleRegister}>
                    <input type="text" placeholder='Email *' value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="text" placeholder='First name *' value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    <input type="text" placeholder='Last name *' value={lastName} onChange={e => setLastName(e.target.value)} required />
                    <input type="text" placeholder='Cosplay name' value={cosplayName} onChange={e => setCosplayName(e.target.value)} />
                    <input type="password" placeholder='Password *' value={password} onChange={e => setPassword(e.target.value)} required />
                    <input type="submit" value="register" />
                </form>
                <div className='loading'>
                    { loading && <CircularProgress size="2em" />}
                </div>
            </div>
            
            
        </>
    )
}