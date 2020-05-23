import { useState } from 'react'
import axios from 'axios'
import useSecurity from '../useSecurity'

export default () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, feedback } = useSecurity()
    const handleLogin = e => {
        login(username, password)
    } 
    return (
        <>
            <h1>{feedback}</h1>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="button" onClick={handleLogin} value="login" />
        </>
    )
}