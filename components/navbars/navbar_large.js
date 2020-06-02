import Link from 'next/link'
import { AppBar, Toolbar } from '@material-ui/core';

import useSecurity from '../../useSecurity'

export default () => {
    const { isLoggedIn } = useSecurity()
    
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Link class="navbar-large title" href="/"><a>'t Klein Moment</a></Link>

                    <div>
                        <Link class="navbar-large" href="/about"><a>About</a></Link>
                        <Link class="navbar-large" href="/albums"><a>Albums</a></Link>
                        <Link class="navbar-large" href="/contact"><a>Contact</a></Link>
                        { !isLoggedIn && 
                            <Link class="navbar-large" href="/login"><a>Login</a></Link>
                            ||
                            // Sublinks naar Account, Favorieten en Afmelden
                            <Link class="navbar-large" href="/profiel"><a>Profiel</a></Link>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
};