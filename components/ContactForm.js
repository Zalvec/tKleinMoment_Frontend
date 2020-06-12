import { useState } from 'react'
import axios from 'axios'

import useSecurity from '../customHooks/useSecurity'
import { Paper, Typography, CircularProgress, TextField, TextareaAutosize, Button } from '@material-ui/core'

export default (props) => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [message, setMessage] = useState('')
    const [feedback, setFeedback] = useState('')
    const [ loading, setLoading ] = useState(false)

    const { isLoggedIn } = useSecurity()

    if(isLoggedIn){
        {/* TODO: Axios call to user to get email, firstname and lastname */}
        console.log('loggedin')
    }
    
    const handleContactFrom = e => {
        e.preventDefault()
        console.log('saving your message')
        console.log(email, firstName, lastName, phoneNumber, message)
        if (phoneNumber === '') setPhoneNumber(null)

        const requestBody = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            text: message
        }

        const config = {
            'Content-Type': 'application/json',
            'Accept': 'application/ld+json'
        }
        setLoading(true)
        axios.post(`https://wdev.be/wdev_roel/eindwerk/api/messages`, requestBody, config)
            .then( response => {
                console.log(response)
                setFeedback('Mail send')
                setEmail('')
                setFirstName('')
                setLastName('')
                setPhoneNumber('')
                setMessage('')
                setLoading(false)
            })
            .catch( error  => {
                setLoading(false)
                console.log(error)
                setFeedback('Something went wrong, try again later')
            })
    }

    return (
        <Paper className="contact-paper">
            <Typography component='h1' variant='h5'>
                Contact formulier
            </Typography>
            <Typography component='h2' variant='body1'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia veritatis exercitationem voluptates, ab voluptate maiores eligendi facilis et deleniti ipsam sit ratione, ullam sed, fuga magnam. Pariatur, distinctio sequi. Repellendus.
            </Typography>
            <Typography component='p' variant='body1'>
                {feedback}
            </Typography>

            <form noValidate onSubmit={handleContactFrom}>
                <div>
                    <TextField 
                        className='textfield'
                        autoComplete='email'
                        variant="filled"
                        name='email'
                        required
                        fullWidth
                        label='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                    />
                    <TextField 
                        className='textfield'
                        autoComplete='firstName'
                        variant="filled"
                        name='firstName'
                        required
                        fullWidth
                        label='First name'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                    />
                </div>
                <div>
                    <TextField 
                        className='textfield'
                        autoComplete='lastName'
                        variant="filled"
                        variant="filled"
                        name='lastName'
                        required
                        fullWidth
                        label='Last name'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                    />
                    <TextField 
                        className='textfield'
                        autoComplete='phoneNumber'
                        variant="filled"
                        name='phoneNumber'
                        fullWidth
                        label='Phone number'
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                    />
                </div>
                
                <TextareaAutosize 
                    placeholder="Your message of question here..."
                    label='Message'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    rowsMin={4}
                />
                <Button className="button" className="button" variant="contained" type='submit'>
                        Send message
                </Button>
            </form>
            <div className='loading'>
                { loading && <CircularProgress size="2em" />}
            </div>
        </Paper>
    )
}
