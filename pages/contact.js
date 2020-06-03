import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'

import Layout from '../components/layout'
import useSecurity from '../useSecurity'

export default () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [message, setMessage] = useState('')
    const [feedback, setFeedback] = useState('')
    const { isLoggedIn } = useSecurity()

    useEffect( () => {
        if(isLoggedIn){
            {/* Axios call to user to get email, firstname and lastname */}
        }
    }, [])

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

        axios.post(`https://wdev.be/wdev_roel/eindwerk/api/messages`, requestBody, config)
            .then( response => {
                console.log(response)
                setFeedback('Mail send')
            })
            .catch( error  => {
                console.log(error)
                setFeedback('Something went wrong, try again later')
            })

        // try {
        //     const contactResponse = await axios.post(`https://127.0.0.1:8000/api/messages`, requestBody, config)
        //     console.log(contactResponse)
        //     setFeedback('Mail send')
        // } catch(error) {
        //     console.log(error)
        //     setFeedback('Something went wrong, try again later')
        // }
    }

    return (
        <>
            <Head>
                <title>'t Klein Moment - Contact</title>
            </Head>
            <Layout>
                <h2>ContactFormulier</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia veritatis exercitationem voluptates, ab voluptate maiores eligendi facilis et deleniti ipsam sit ratione, ullam sed, fuga magnam. Pariatur, distinctio sequi. Repellendus.</p>
                <h3>{feedback}</h3>

                <form onSubmit={handleContactFrom}>
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                
                    <label htmlFor="firstName">First name: </label>
                    <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                
                    <label htmlFor="lastName">Last name: </label>
                    <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
                
                    <label htmlFor="phoneNumber">PhoneNumber: </label>
                    <input type="text" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />

                    <textarea value={message} onChange={e => setMessage(e.target.value)} required placeholder='Message'/>
                    
                    <input type="submit" value="Send message" />
                </form>

            </Layout>
        </>
    )
}

// const register = async ( email, firstName, lastName, cosplayName = null, password) => {
//         const requestBody = {
//             email: email,
//             firstName: firstName,
//             lastName: lastName,
//             cosplayName: cosplayName,
//             password: password
//         }
//         const config = {
//             'Content-Type': 'application/json'
//         }
//         try {
//             const registerResponse = await axios.post(`https://wdev.be/wdev_roel/eindwerk/api/users`, requestBody, config)
//             console.log(registerResponse)
//             login(registerResponse.data.email, password)
//         } catch (error) {
//             console.log(error)
//             setFeedback("Couldn't register")
//         }
//     }

//     const handleRegister = e => {
//         e.preventDefault()
//         if (cosplayName !== '') register( email, firstName, lastName, cosplayName, password )
//         if (cosplayName === '') register( email, firstName, lastName, null, password )
