import { useEffect, useState } from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />
}

// Geeft een snackbar met de meegegeven message
// De type die meegegeven wordt bepaald wat voor soort snackbar het is
export default ({setMessage = null, message, type}) => {
    const [open, setOpen] = useState(false)

    useEffect( () => {
        message !== '' ? setOpen(true) : ''
    }, [message])

    const handleClose = () => {
        setOpen(false)
        if ( setMessage ) setMessage('')   // message leegmaken zodat een zelfde error meteen opnieuw verstuurd kan worden
    }

    return (
        <Snackbar open={open} autoHideDuration={7000} onClose={handleClose} style={{ marginBottom: "2em" }}>
            <Alert onClose={handleClose} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    )
}
