import { useState } from 'react'
import { Paper, Typography, TextField, Button, InputAdornment } from "@material-ui/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../fontAwesome/fontAwesome'

export default ({userData}) => {
    // Gebruikers data opsplitsen
    console.log(JSON.parse(userData))
    const userInfo = JSON.parse(userData)

    //variabelen setten
    const [ email, setEmail] = useState(userInfo.username)
    const [ cosplayName, setCosplayName ] = useState(userInfo.cosplay === null ? '' : userInfo.cosplay)
    const [ password, setPassword ] = useState('')
    const [ repeatPassword, setRepeatPassword ] = useState('') 
    const [ feedback, setFeedback ] = useState('')

    // Veranderingen opslaan
    // TODO - uitwerken
    const HandleProfileChanges = (e) => {
        e.preventDefault()

    }

    // Account verwijderen
    // TODO - uitwerken
    const HandleDeleteAccount = (e) => {
        e.preventDefault()

    }

    return (
        <Paper className='profiel-paper' elevation={0}>
            <Typography component='h1' variant='h5'>Profiel</Typography>

            <div className='profiel-fields'>
                <div>
                    <TextField
                        className='textfield'
                        disabled='true'
                        variant="filled"
                        fullWidth
                        label='Name'
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
                        disabled='true'
                        fullWidth
                        label='Start membership'
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
                            label='Cosplay name'
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
                            label='Password'
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
                            label='Repeat password'
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
                        Save changes
                    </Button>  
                </form>
                <Button className="button" variant="contained" type='submit' fullWidth onClick={HandleDeleteAccount}>
                    Delete account
                </Button>
            </div>
        </Paper>
    )
}