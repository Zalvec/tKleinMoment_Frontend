import { useState } from 'react'
import useSecurity from '../../useSecurity'

export default () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cosplayName, setCosplayName] = useState('')
    const [password, setPassword] = useState('')
    const { register, feedback } = useSecurity()
    const handleRegister = e => {
        e.preventDefault()
        if (cosplayName !== '') register( email, firstName, lastName, cosplayName, password )
        if (cosplayName === '') register( email, firstName, lastName, null, password )
    } 
    return (
        <>
            <h1>{feedback}</h1>
            <form onSubmit={handleRegister}>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                
                <label htmlFor="firstName">First name: </label>
                <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                
                <label htmlFor="lastName">Last name: </label>
                <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
                
                <label htmlFor="cosplayName">Cosplay name: </label>
                <input type="text" id="cosplayName" value={cosplayName} onChange={e => setCosplayName(e.target.value)} />
                
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                
                <input type="submit" value="register" />
            </form>
            
        </>
    )
}