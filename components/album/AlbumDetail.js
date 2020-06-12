import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, CircularProgress } from '@material-ui/core'
import moment from 'moment'
import Masonry from 'react-masonry-css'
import { SRLWrapper } from 'simple-react-lightbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../fontAwesome/fontAwesome'

export default ({album}) => {
    console.log(album)

    const router = useRouter()

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
            // showDownloadButton: false,
        },
        thumbnails: {
            thumbnailsPosition: 'left'
        },
        progressBar: {
            backgroundColor: 'rgb(161, 153, 153)',
            fillColor: '#a52727'
        }
    }

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };
    // const handleDownload = (e) => {
    //     console.log(e.target.classList)
    // }

    // Toont loading als de pagina nog niet gebuild is en door fallback gegerereerd word
    if (router.isFallback){
        return <CircularProgress />
    }
    
    return (
        <div className='album-detail container'>
            {/* <a href={`https://wdev.be/wdev_roel/eindwerk/download.php?img=https://wdev.be/wdev_roel/eindwerk/system/img/albums/${album.images[0].image}`}>
                <img src={`https://wdev.be/wdev_roel/eindwerk/download.php?img=https://wdev.be/wdev_roel/eindwerk/system/img/albums/${album.images[0].image}`} alt="test"/>
            </a> */}
            <a href={`https://wdev.be/wdev_roel/eindwerk/download.php?file=${album.images[0].image}`}>Dowload File</a>
            <Card className='album-card' elevation={0}>
                <CardContent className='album-content'>
                    <Typography variant="h3" component="h1">{album.name}</Typography>
                    <div>
                        <Typography variant="body1" component="p">Description:</Typography>
                        <Typography variant="body1" component="p">{album.description}</Typography>
                    </div>    
                    <div>
                        <Typography variant="body1" component="p">Location:</Typography>
                        <Typography variant="body1" component="p">{album.location}</Typography>
                    </div>
                    <div>
                        <Typography variant="body1" component="p">Event:</Typography>   
                        <Typography variant="body1" component="p">{album.event}</Typography>
                    </div>
                    <div>
                        <Typography variant="body1" component="p">Date:</Typography>
                        <Typography variant="body1" component="p">{moment(album.date).locale('nl').format("DD MMMM YYYY")}</Typography>
                    </div>
                </CardContent>
            </Card>
            <SRLWrapper options={options}>
                {/* Masonry of images */}
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {album.images.map(  
                        ({image, alt, active, id}) => 
                            (   
                                <>
                                    { active && 
                                        <figure>
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
                                            <figcaption>
                                                {/* Button to download that image with php file download.php */}
                                                <a href={`https://wdev.be/wdev_roel/eindwerk/download.php?file=${image}`}>
                                                    <FontAwesomeIcon icon="download"/>
                                                </a>
                                            </figcaption>
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


{/* <a
                                                className='a-image'
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
                                            </a> */}

                                            {/* Button to download that image with php file download.php */}
                                            // <a className='a-download' href={`https://wdev.be/wdev_roel/eindwerk/download.php?file=${image}`}>
                                            //     <FontAwesomeIcon icon="download"/>
                                            // </a>