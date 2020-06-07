import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import useSecurity from '../useSecurity'
import useWindowSize from '../useWindowSize'

export default () => {
    const size = useWindowSize();
  
    const { isLoggedIn } = useSecurity()
    const [ menuStatus, setMenuStatus ] = useState(false)
    console.log(menuStatus)
    
    const ToggleMenuHandler = ()=> {
        setMenuStatus(!menuStatus)
    }

    const classnamesmall = clsx({ "hamburger-menu-list": true,
                             "hamburger-menu-open": menuStatus,
                             "hamburger-menu-closed": !menuStatus})
    const classname = size.width >= 750 ? 'menu' : classnamesmall

    return ( 
        <div className="main-navbar">
            <Link class="title" href="/"><a>'t Klein Moment</a></Link>
            <nav>
                <button className="mobile-hamburger" onClick={ToggleMenuHandler}>MENU</button>
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
                        { !isLoggedIn &&
                            <li>
                                <Link href="/login"><a>Login</a></Link>
                            </li>
                            ||
                            <li>
                                <Link href="/favorieten"><a>Profiel</a></Link>
                                <ul>
                                    <li>
                                        <Link href="/profiel"><a>Account</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/favorieten"><a>Favorieten</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/logout"><a>Logout</a></Link>
                                    </li>
                                </ul>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}