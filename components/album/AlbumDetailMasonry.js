import React, { useState, useEffect } from 'react'
import Masonry from 'react-masonry-css'
import { SRLWrapper } from 'simple-react-lightbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../fontAwesome/fontAwesome'
import { parseCookies } from 'nookies'
import axios from 'axios'

export default ({album}) => {
    // variabelen setten
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ userID, setUserID ] = useState()

    // bij het laden van de pagina checken of de gebruiker is ingelogd of niet
    useEffect( () => {
        const cookies = parseCookies()
        typeof cookies.jwtToken !== 'undefined' ? setLoggedIn(true) : setLoggedIn(false)
        setUserID(cookies.userid)
    }, [])

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

    // Download opslaan in database
    const HandleDownload = id => (e) => {

        // Gegevens bundelen voor axios
        const requestBody = {
            // Id van de user wordt opgevraagt via de cookie en in useState gestoken, id van de image wordt meegegeven aan de functie
            "image": `/wdev_roel/eindwerk/api/images/${id}`,
            "user": `/wdev_roel/eindwerk/api/users/${userID}`
        }

        // configuratie voor axios
        const config = {
            'Content-Type': 'application/json',
            'Accept': 'application/ld+json'
        }

        // Er moet geen visuele response zijn voor de users. Enkel een post met console.log()'s om bij development te controleren of alles werkt 
        axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}download_logs`, requestBody, config)
            .then ( response => {
                console.log(response)
            })
            .catch ( error => {
                console.log(error)
            })
    }
    
    return (
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
                            <div key={id}>
                                {/* Als een image actief is, wordt deze weergegeven */}
                                { active && 
                                    <figure>
                                        {/* image.php zorgt ervoor dat de opgehaalde foto's met kleinere resolutie getoond worden op de pagina 
                                            in <a> krijgt de image een grotere 'width', dit is de foto die fullscreen getoond zal worden
                                        */}
                                        <a
                                            rel="noopener noreferrer"
                                            href={`${process.env.NEXT_PUBLIC_BASE}image.php?${image}&width=1080&image=/wdev_roel/eindwerk/system/img/albums/${image}`}
                                            data-attribute="SRL"
                                        >
                                            <img 
                                                src={`${process.env.NEXT_PUBLIC_BASE}image.php?${image}&width=490&image=/wdev_roel/eindwerk/system/img/albums/${image}`} 
                                                alt={alt}
                                                id={id}
                                                className='item'
                                            />
                                        </a>
                                        {/* Als een gebruiker is ingelogd, krijgt het de optie om foto's te downloaden */}
                                        { loggedIn &&
                                            <figcaption>
                                                {/* Knop om deze image te downloaden mbv download.php - bestand uit de backend */}
                                                <a href={`${process.env.NEXT_PUBLIC_BASE}download.php?file=${image}`} onClick={HandleDownload(id)}>
                                                    <FontAwesomeIcon icon="download"/>
                                                </a>
                                            </figcaption>
                                        }
                                    </figure>
                                }
                            </div>
                        )
                    )
                }
            </Masonry>
        </SRLWrapper>
    )
}