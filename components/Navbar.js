import { useState, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../fontAwesome/fontAwesome'
import { parseCookies } from 'nookies'

import { logout } from '../helpers/helpers'
import useWindowSize from '../customHooks/useWindowSize'


export default () => {
    // Checken of een gebruiker is ingelogd of niet
    const [ loggedIn, setLoggedIn ] = useState(false)
    useEffect( () => {
        const cookies = parseCookies()
        console.log(cookies)
        typeof cookies.jwtToken !== 'undefined' ? setLoggedIn(true) : setLoggedIn(false)
    })

    // Window size
    const size = useWindowSize();
    
    // variabelen aanmaken
    const [ menuStatus, setMenuStatus ] = useState(false)
    const [ classname, setClassname ] = useState('menu')
    
    // hamburger menu togglen
    const ToggleMenuHandler = ()=> {
        setMenuStatus(!menuStatus)
    }

    // Uitloggen - cookies verwijderen en redirect naar index.js
    const LogoutHandler = () => {
        logout()
    }

    // Classnames maken adhv of het hamburgermenu al dan niet open is
    const classnamesmall = clsx({ "hamburger-menu-list": true,
                             "hamburger-menu-open": menuStatus,
                             "hamburger-menu-closed": !menuStatus
    })

    // Navigatiebalk aanpassen naargelang de breedte van het scherm                        
    useEffect( () => {
        setClassname(size.width >= 800 ? 'menu' : classnamesmall)
    })

    return ( 
        <header>
            <div className="main-navbar container">
                <Link href="/"><a className='title'>'t Klein Moment</a></Link>
                <nav>
                    <FontAwesomeIcon icon="bars" size='2x' className="mobile-hamburger" onClick={ToggleMenuHandler}/>
                    <div className={classname} onClick={ToggleMenuHandler}>
                        <ul>
                            <li>
                                <Link href="/about"><a>About</a></Link>
                            </li>
                            <li>
                                <Link href="/albums"><a>Albums</a></Link>
                            </li>
                            <li>
                                <Link href="/contact"><a>Contact</a></Link>
                            </li>
                            {/* Rendert op basis of een gebruiker is ingelogd of niet */}
                            { loggedIn &&
                                <>
                                    <li>
                                        <Link href="/profiel"><a>Profiel</a></Link>
                                    </li>
                                    <li>
                                        <p onClick={LogoutHandler}>Logout</p>
                                    </li>
                                </>
                                ||
                                <li>
                                    <Link href="/login"><a>Login</a></Link>
                                </li>
                            }
                            
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}