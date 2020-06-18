import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, CircularProgress } from '@material-ui/core'
import moment from 'moment'
import Masonry from 'react-masonry-css'
import { SRLWrapper } from 'simple-react-lightbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../fontAwesome/fontAwesome'
import { parseCookies } from 'nookies'

export default ({album}) => {
    // variabelen setten
    const [ loggedIn, setLoggedIn ] = useState(false)

    // bij het laden van de pagina checken of de gebruiker is ingelogd of niet
    useEffect( () => {
        const cookies = parseCookies()
        console.log( cookies.jwtToken )
        typeof cookies.jwtToken !== 'undefined' ? setLoggedIn(true) : setLoggedIn(false)
    }, [])

    const router = useRouter()

    // settings en styling voor de image popup
    const options = {
        settings: {
            overlayColor: "rgb(19, 17, 17)",
            autoplaySpeed: 3000,
            transitionSpeed: 900,
        },
        caption: {
            captionColor: "#F6F6F6",
            captionFontFamily: "Roboto Slab, sans-serif",
            captionFontWeight: "300",
            captionTextTransform: "Capitalize",
        },
        buttons: {
            backgroundColor: "#a52727",
            iconColor: "#F6F6F6",
            showDownloadButton: false,
        },
        thumbnails: {
            thumbnailsPosition: 'left'
        },
        progressBar: {
            backgroundColor: 'rgb(161, 153, 153)',
            fillColor: '#a52727'
        }
    }

    // breakpoints voor maysonry bepalen
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

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
            <SRLWrapper options={options}>
                {/* Masonry van de images */}
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {/* Alle images in een album mappen */}
                    {album.images.map(  
                        ({image, alt, active, id}) => 
                            (   
                                <>
                                    {/* Als een image actief is, wordt deze weergegeven */}
                                    { active && 
                                        <figure>
                                            {/* image.php zorgt ervoor dat de opgehaalde foto's met kleinere resolutie getoond worden op de pagina 
                                                in <a> krijgt de image een grotere 'width', dit is de foto die fullscreen getoond zal worden
                                            */}
                                            <a
                                                key={id}
                                                rel="noopener noreferrer"
                                                href={`https://wdev.be/wdev_roel/eindwerk/image.php?${image}&width=1080&image=/wdev_roel/eindwerk/system/img/albums/${image}`}
                                                data-attribute="SRL"
                                            >
                                                <img 
                                                    src={`https://wdev.be/wdev_roel/eindwerk/image.php?${image}&width=490&image=/wdev_roel/eindwerk/system/img/albums/${image}`} 
                                                    alt={alt}
                                                    id={id}
                                                    className='item'
                                                />
                                            </a>
                                            {/* Als een gebruiker is ingelogd, krijgt het de optie om foto's te downloaden */}
                                            { loggedIn &&
                                                <figcaption>
                                                    {/* Knop om deze image te downloaden mbv download.php - bestand uit de backend */}
                                                    <a href={`https://wdev.be/wdev_roel/eindwerk/download.php?file=${image}`}>
                                                        <FontAwesomeIcon icon="download"/>
                                                    </a>
                                                </figcaption>
                                            }
                                        </figure>
                                    }
                                </>
                            )
                        )
                    }
                </Masonry>
            </SRLWrapper>
        </div>
    )
}