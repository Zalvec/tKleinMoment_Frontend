import { useEffect, useState } from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
//TODO - gebruiken??
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

// Geeft een popup error message met de meegegeven feedback
export default ({feedback}) => {
    const [open, setOpen] = useState(false)
    

    //Feedback wordt enkel getoond als feedback veranderd en niet een lege string
    useEffect( () => {
        feedback !== '' ? setOpen(true) : ''
    }, [feedback])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false)
    }

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ marginBottom: "2em" }}>
            <Alert onClose={handleClose} severity="error">
                {feedback}
            </Alert>
        </Snackbar>
    )
}
