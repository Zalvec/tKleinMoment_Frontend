import { useState } from 'react'
import { Typography, TextField, Button, CircularProgress, Paper } from '@material-ui/core'

import useSecurity from '../../customHooks/useSecurity'

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

// styling of login

// .login-container {
//     display: flex;
//     flex-direction: row;
//     justify-content: center;

//     .form {
//         background: $zwart;
//         color: $wit;
//         margin: .5em 2em;
//         border-radius: 10px;
//         max-width: 700px;
//         width: 50%;

//         .title {
//             font-size: 2.5rem;
//             display: flex;
//             justify-content: center;
//             padding: 1em 0;
//         }

//         .feedback {
//             font-size: 1.1rem;
//             color: red;
//             height: 60px;
//             padding: 0 .4em;
//             text-align: center;
//         }

//         .login-form {
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;

//             input {
//                 border-radius: 5px;
//                 margin-bottom: 20px;
//             }

//             input[type=text],
//             input[type=password] {
//                 padding: 5px 10px;
//                 width: 80%;
//                 max-width: 400px;
//             }

//             input[type=submit] {
//                 padding: 5px 20px;
//                 background-color: brown;
//                 color: $wit;

//                 &:hover { background-color: rgb(201, 30, 30);}
//             }
//         }

//         .loading {
//             display: flex;
//             justify-content: center;
//             height: 3em;
//         }
//     }
// }