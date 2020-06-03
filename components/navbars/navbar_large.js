import Link from 'next/link'
import { useState } from 'react'
import { AppBar, Toolbar, Button, Menu, MenuItem } from '@material-ui/core';

import useSecurity from '../../useSecurity'

export default () => {
    const { isLoggedIn } = useSecurity()
    
    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ open, setOpen ] = useState(false)

    const handleProfileClose = e => {
        setAnchorEl(null)
    }

    const OnProfile = e => {
        setAnchorEl(e.currentTarget)
        setOpen(!open)
    }


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
                            <>
                                {/* <Link class="navbar-large" href="/profiel"><a>Profiel</a></Link> */}
                                <p aria-haspopup="true" onClick={OnProfile}>Profiel</p>
                                {/* <Button aria-haspopup="true" onClick={OnProfile} >Profiel</Button> */}
                                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleProfileClose} >
                                    <MenuItem onClick={handleProfileClose}>
                                        <Link href="/account"><a>Account</a></Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleProfileClose}>
                                        <Link href="/favorieten"><a>Favorieten</a></Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleProfileClose}>
                                        <Link href="/logout"><a>Logout</a></Link>
                                    </MenuItem>
                                </Menu>
                            </>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
};