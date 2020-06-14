import axios from 'axios'
import { parseCookies } from 'nookies'


const userData = async (ctx) => {
    // cookies opvragen
    const cookies = parseCookies(ctx)

    // gebruikers informatie ophalen uit de cookie
    const userData = cookies.userinfo

    return userData
}

module.exports = userData;