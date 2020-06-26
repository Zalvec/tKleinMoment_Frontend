import React from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, CircularProgress } from '@material-ui/core'
import moment from 'moment'
import AlbumDetailMasonry from './AlbumDetailMasonry'

export default ({album}) => {

    const router = useRouter()

    // Toont loading als de pagina nog niet gebuild is en door fallback gegerereerd word
    if (router.isFallback){
        return <CircularProgress />
    }
    
    return (
        <div className='album-detail container'>
            {/* Overzicht van de albumsdetails */}
            <Card className='album-card' elevation={0}>
                <CardContent className='album-content'>
                    <Typography variant="h3" component="h1">{album.name}</Typography>
                    <div>
                        <Typography variant="body1" component="p">Beschrijving:</Typography>
                        <Typography variant="body1" component="p">{album.description}</Typography>
                    </div>    
                    <div>
                        <Typography variant="body1" component="p">Locatie:</Typography>
                        <Typography variant="body1" component="p">{album.location}</Typography>
                    </div>
                    <div>
                        <Typography variant="body1" component="p">Evenement:</Typography>   
                        <Typography variant="body1" component="p">{album.event}</Typography>
                    </div>
                    <div>
                        {/* moment zet de datum die binnenkomt als 2020-05-10T00:00:00+02:00 om in een leesbare datum 10 mei 2020 */}
                        <Typography variant="body1" component="p">Datum:</Typography>
                        <Typography variant="body1" component="p">{moment(album.date).locale('nl').format("DD MMMM YYYY")}</Typography>
                    </div>
                </CardContent>
            </Card>
            <AlbumDetailMasonry album={album} />
        </div>
    )
}