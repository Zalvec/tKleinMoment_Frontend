import { useState } from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Backdrop, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import useSecurity from '../../useSecurity'

const useStyles = makeStyles( theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}))

export default () => {
    const { isLoggedIn } = useSecurity()
    const classes = useStyles()

    /* Dropdown menu */
    const [ anchorEl, setAnchorEl ] = useState(null)
        
    /* Backdrop */
    const [ open, setOpen ] = useState(false)

    /* Dropdown menu */
    const handleMenuClose = e => {
        setAnchorEl(null)
    }

    /* Backdrop */
    const handleBackdropClose = () => {
        setOpen(false)
        handleMenuClose()
    }

    /* Onclick menu */
    const handleOnMenu = e => {
        setAnchorEl(e.currentTarget)
        setOpen(!open)
    }    

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleOnMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Link href="/"><a>'t Klein Moment</a></Link>
                </Toolbar>
            </AppBar>
            <Backdrop className={classes.backdrop} open={open} onClick={handleBackdropClose}>
                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleMenuClose}>
                        <Link href="/about"><a>About</a></Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <Link href="/albums"><a>Albums</a></Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <Link href="/contact"><a>Contact</a></Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        { !isLoggedIn && 
                            <Link href="/login"><a>Login</a></Link>
                            ||
                            // Sublinks naar Account, Favorieten en Afmelden
                            <Link href="/profiel"><a>Profiel</a></Link>
                        }
                    </MenuItem>
                </Menu>
            </Backdrop>
        </>
    )
};