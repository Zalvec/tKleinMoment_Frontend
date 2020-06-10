import { useRouter } from 'next/router'
import { Card, CardContent, Typography, CircularProgress, Paper } from '@material-ui/core'
import moment from 'moment'
import Masonry from 'react-masonry-css'

export default ({album}) => {
    console.log(album)

    const router = useRouter()

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
            <Card className='album-card' elevation='0'>
                <CardContent className='album-content'>
                    <Typography variant="h3" component="h1">{album.name}</Typography>
                    <div>
                        <Typography variant="p" component="p">Description:</Typography>
                        <Typography variant="p" component="p">{album.description}</Typography>
                    </div>    
                    <div>
                        <Typography variant="p" component="p">Location:</Typography>
                        <Typography variant="p" component="p">{album.location}</Typography>
                    </div>
                    <div>
                        <Typography variant="p" component="p">Event:</Typography>   
                        <Typography variant="p" component="p">{album.event}</Typography>
                    </div>
                    <div>
                        <Typography variant="p" component="p">Date:</Typography>
                        <Typography variant="p" component="p">{moment(album.date).locale('nl').format("DD MMMM YYYY")}</Typography>
                    </div>
                </CardContent>
            </Card>



            {/* Masonry of images */}
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {album.images.map(  
                    ({image, alt, description, active, id}) => 
                        (   
                            <>
                                { active && 
                                    <a
                                        href={`https://wdev.be/wdev_roel/eindwerk/system/img/albums/${image}`}
                                        key={id}
                                        rel="noopener noreferrer"
                                        target='_blank'
                                    >
                                        <img 
                                            src={`https://wdev.be/wdev_roel/eindwerk/image.php?${image}&width=800&image=/wdev_roel/eindwerk/system/img/albums/${image}`} 
                                            alt={alt}
                                            id={id}
                                            className='item'
                                            />
                                        {/* <Typography>
                                            {description}
                                        </Typography> */}
                                    </a>
                                }
                            </>
                        )
                    )
                }
            </Masonry>
        </div>
    )
}