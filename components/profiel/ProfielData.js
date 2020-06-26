import { parseCookies } from 'nookies'


const userData = async (ctx) => {
    // cookies opvragen
    const cookies = parseCookies(ctx)

    // gebruikers informatie ophalen uit de cookie
    const userData = cookies.userinfo
    const refreshtoken = cookies.refreshtoken
    const jwt = cookies.jwtToken

    return {userData, refreshtoken, jwt}
}

module.exports = userData;