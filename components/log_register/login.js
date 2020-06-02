import { useState } from 'react'

import useSecurity from '../../useSecurity'

export default () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, feedback } = useSecurity()
    const handleLogin = e => {
        e.preventDefault()
        login(username, password)
    } 
    return (
        <>
            <h1>{feedback}</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="login" />
            </form>
        </>
    )
}