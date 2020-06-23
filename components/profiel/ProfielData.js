import { parseCookies } from 'nookies'


const userData = async (ctx) => {
    // cookies opvragen
    const cookies = parseCookies(ctx)

    // gebruikers informatie ophalen uit de cookie
    const userData = cookies.userinfo
    const jwt = cookies.jwtToken

    return {userData, jwt}
}

module.exports = userData;