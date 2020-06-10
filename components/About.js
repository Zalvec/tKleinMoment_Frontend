import { Card, CardContent, Typography, CardMedia } from '@material-ui/core'

import useWindowSize from '../customHooks/useWindowSize'

export default ({abouts}) => {
    const size = useWindowSize();

    return (
        <div className="about">

            { abouts.filter( about => about.header === 'About me' ).map(aboutMe => (
                <Card square='true' className='about-me container' elevation='0'>
                    <CardContent className="about-me-article">
                        <Typography variant="h5" component="h2" className='about-me-title'>
                            {aboutMe.header}
                        </Typography>
                        <Typography variant="body2" component="p" className='about-me-text'>
                            <div dangerouslySetInnerHTML={{__html: aboutMe.text}} />
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            <div className="about-content">
                { abouts.filter( about => about.header !== 'About me' ).map( (aboutMe, index) => 
                    <>
                        { size.width < 900 &&
                            <Card square='true' className="about-content-item">
                                <CardMedia 
                                    component='img'
                                    alt={`illustration for section ${aboutMe.header}`}
                                    image={`https://wdev.be/wdev_roel/eindwerk/image.php?${aboutMe.image}&width=800&height=800&image=/wdev_roel/eindwerk/system/img/about/${aboutMe.image}`}
                                />
                                <CardContent className="about-content-article">
                                    <Typography variant="h5" component="h2" className="about-content-title">
                                        {aboutMe.header}
                                    </Typography>
                                    <Typography variant="body2" component="p" className="about-content-text">
                                        <div dangerouslySetInnerHTML={{__html: aboutMe.text}} />
                                    </Typography>
                                </CardContent>
                            </Card>
                            ||
                            <>
                                { index%2 === 0 &&
                                    <Card square='true' className="about-content-item container">
                                        <CardContent className="about-content-article">
                                            <Typography variant="h5" component="h2" className="about-content-title">
                                                {aboutMe.header}
                                            </Typography>
                                            <Typography variant="body2" component="p" className="about-content-text">
                                                <div dangerouslySetInnerHTML={{__html: aboutMe.text}} />
                                            </Typography>
                                        </CardContent>
                                        <CardMedia 
                                            component='img'
                                            alt={`illustration for section ${aboutMe.header}`}
                                            image={`https://wdev.be/wdev_roel/eindwerk/image.php?${aboutMe.image}&width=800&height=800&image=/wdev_roel/eindwerk/system/img/about/${aboutMe.image}`}
                                        />
                                    </Card>
                                    ||
                                    <Card square='true' className="about-content-item container">
                                        <CardMedia 
                                            component='img'
                                            alt={`illustration for section ${aboutMe.header}`}
                                            image={`https://wdev.be/wdev_roel/eindwerk/image.php?${aboutMe.image}&width=800&height=800&image=/wdev_roel/eindwerk/system/img/about/${aboutMe.image}`}
                                        />
                                        <CardContent className="about-content-article">
                                            <Typography variant="h5" component="h2" className="about-content-title">
                                                {aboutMe.header}
                                            </Typography>
                                            <Typography variant="body2" component="p" className="about-content-text">
                                                <div dangerouslySetInnerHTML={{__html: aboutMe.text}} />
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                }
                            </>
                        }
                    </>
                )}
            </div>

            {/* <div className="about-content">
                { abouts.filter( about => about.header !== 'About me' ).map( (aboutMe, index) => 
                    <>
                        { index%2 === 0 &&
                            <article>
                                <div>
                                    <h3>{aboutMe.header}</h3>
                                    <div dangerouslySetInnerHTML={{__html: aboutMe.text}}></div>
                                </div>
                                <img key={aboutMe.id} alt={`illustration for section ${aboutMe.header}`} src={`https://wdev.be/wdev_roel/eindwerk/image.php?${aboutMe.image}&width=200&height=200&image=/wdev_roel/eindwerk/system/img/about/${aboutMe.image}`} />
                            </article>
                            ||
                            <article>
                                <img key={aboutMe.id} alt={`illustration for section ${aboutMe.header}`} src={`https://wdev.be/wdev_roel/eindwerk/image.php?${aboutMe.image}&width=200&height=200&image=/wdev_roel/eindwerk/system/img/about/${aboutMe.image}`} />
                                <div>
                                    <h3>{aboutMe.header}</h3>
                                    <div dangerouslySetInnerHTML={{__html: aboutMe.text}}></div>
                                </div>
                            </article>
                        }
                    </>
                )}
            </div> */}
        </div>
    )
}