import { parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

// De cookies opvragen en checken of de user niet is ingelogd
// Geen cookie genaamd jwtToken betekend niet ingelogd
export const guestUser = (ctx, url) => {
    const cookies = parseCookies(ctx)

    if ( typeof cookies.jwtToken === "undefined"){
        ctx.res.statusCode = 302
        ctx.res.setHeader('Location', url)
    }
}

// De cookies opvragen en checken of de user is ingelogd
// Een cookie genaamd jwtToken betekend ingelogd
export const loggedUser = (ctx, url) => {
    const cookies = parseCookies(ctx)

    if ( typeof cookies.jwtToken !== "undefined"){
        ctx.res.statusCode = 302
        ctx.res.setHeader('Location', url)
    }
}

// Alle cookies opvragen en de gemaakte cookies bij login verwijderen
// Daarna redirecten naar home
export const logout = () => {
    const cookies = parseCookies()
    destroyCookie(null, 'userid')
    destroyCookie(null, 'userinfo')
    destroyCookie(null, 'jwtToken')
    Router.push("/")
}