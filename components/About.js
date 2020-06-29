import { Card, CardContent, Typography, CardMedia } from '@material-ui/core'

import useWindowSize from '../customHooks/useWindowSize'

// Inhoud van de about pagina
export default ({abouts}) => {
    // Window size opvragen via custom hook
    const size = useWindowSize();

    return (
        <div className="about">
            {/* About filteren op header 'About me' en die mappen */}
            { abouts.filter( about => about.header === 'About me' ).map( aboutMe => 
                <Card key={ aboutMe.id } className='about-me container' elevation={0}>
                    <CardContent className="about-me-article">
                        <Typography variant="h5" component="h2" className='about-me-title'>
                            {aboutMe.header}
                        </Typography>
                        <Typography variant="body2" component="div" className='about-me-text'>
                            {/* In de backend kan de admin de text stijlen en deze wordt met HTML-tag opgeslagen in de database
                                Hiermee wordt deze tekst mooi weergegeven ipv met HTML-tags zichtbaar voor de gebruikers
                            */}
                            <div dangerouslySetInnerHTML={{__html: aboutMe.text}} />
                        </Typography>
                    </CardContent>
                </Card>
            )}
            <div className="about-content">
                {/* About filteren op header 'About me' en al de rest mappen*/}
                { abouts.filter( about => about.header !== 'About me' ).map( (aboutMe, index) => 
                    <div key={index}>
                        {/* Als het scherm kleiner is dan 900px, worden alle abouts onder elkaar getoond. Eerst foto dan tekst*/}
                        { size.width < 900 &&
                            <Card key={aboutMe.id} className="about-content-item">
                                {/* image.php zorgt ervoor dat de opgehaalde foto's met kleinere resolutie getoond worden op de pagina */}
                                <CardMedia 
                                    component='img'
                                    alt={`illustration for section ${aboutMe.header}`}
                                    image={`${process.env.NEXT_PUBLIC_BASE}image.php?${aboutMe.image}&width=880&image=/wdev_roel/eindwerk/system/img/about/${aboutMe.image}`}
                                />
                                <CardContent className="about-content-article">
                                    <Typography variant="h5" component="h2" className="about-content-title">
                                        {aboutMe.header}
                                    </Typography>
                                    <Typography variant="body2" component="div" className="about-content-text">
                                        <div dangerouslySetInnerHTML={{__html: aboutMe.text}} />
                                    </Typography>
                                </CardContent>
                            </Card>
                            ||
                            <>
                                {/* Als het scherm gelijk of groter is dan 900px, dan worden de images en tekst van elke about naast elkaar getoond
                                    Bij een even index staat eerst de tekst dan de image. Bij een oneven index staat de image eerst en dan de tekst
                                */}
                                { index%2 === 0 &&
                                    <Card key={aboutMe.id} className="about-content-item container">
                                        <CardContent className="about-content-article">
                                            <Typography variant="h5" component="h2" className="about-content-title">
                                                {aboutMe.header}
                                            </Typography>
                                            <Typography variant="body2" component="div" className="about-content-text">
                                                {/* In de backend kan de admin de text stijlen en deze wordt met HTML-tag opgeslagen in de database
                                                    Hiermee wordt deze tekst mooi weergegeven ipv met HTML-tags zichtbaar voor de gebruikers
                                                */}
                                                <div dangerouslySetInnerHTML={{__html: aboutMe.text}} />
                                            </Typography>
                                        </CardContent>
                                        {/* image.php zorgt ervoor dat de opgehaalde foto's met kleinere resolutie getoond worden op de pagina */}
                                        <CardMedia 
                                            component='img'
                                            alt={`illustration for section ${aboutMe.header}`}
                                            image={`${process.env.NEXT_PUBLIC_BASE}image.php?${aboutMe.image}&width=880&image=/wdev_roel/eindwerk/system/img/about/${aboutMe.image}`}
                                        />
                                    </Card>
                                    ||
                                    <Card key={aboutMe.id} className="about-content-item container">
                                        {/* image.php zorgt ervoor dat de opgehaalde foto's met kleinere resolutie getoond worden op de pagina */}
                                        <CardMedia 
                                            component='img'
                                            alt={`illustration for section ${aboutMe.header}`}
                                            image={`${process.env.NEXT_PUBLIC_BASE}image.php?${aboutMe.image}&width=880&image=/wdev_roel/eindwerk/system/img/about/${aboutMe.image}`}
                                        />
                                        <CardContent className="about-content-article">
                                            <Typography variant="h5" component="h2" className="about-content-title">
                                                {aboutMe.header}
                                            </Typography>
                                            <Typography variant="body2" component="div" className="about-content-text">
                                                {/* In de backend kan de admin de text stijlen en deze wordt met HTML-tag opgeslagen in de database
                                                    Hiermee wordt deze tekst mooi weergegeven ipv met HTML-tags zichtbaar voor de gebruikers
                                                */}
                                                <div dangerouslySetInnerHTML={{__html: aboutMe.text}} />
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                }
                            </>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}