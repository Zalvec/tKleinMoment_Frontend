import { useRouter } from 'next/router'
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core'

export default ({album}) => {
    console.log(album)

    const router = useRouter()

    // Toont loading als de pagina nog niet gebuild is en door fallback gegerereerd word
    if (router.isFallback){
        return <LinearProgress />
    }
    
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h3" component="h2">{album.name}</Typography>
                    <Typography>Description: {album.description}</Typography>
                    <Typography>Location: {album.location}</Typography>
                    <Typography>Event: {album.event}</Typography>
                    <Typography>Date: {album.date}</Typography>
                </CardContent>
            </Card>

            {/* Toont enkel images als er images in het album staan */}
            { album.images.length !== 0 &&
                album.images.map( 
                    ({image, alt, description, active, id}) => 
                        (   
                            <>
                                {/* Toont enkel images die actief staan in de database */}
                                { active && 
                                    <Card>
                                        <img src={`https://wdev.be/wdev_roel/eindwerk/image.php?${image}&width=200&height=200&image=/wdev_roel/eindwerk/system/img/albums/${image}`} alt={alt}/>
                                        <CardContent>
                                            <Typography>
                                                {description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                }
                            </>
                        )
                )
                ||
                <p>No images in this album</p>
            }
        </>
    )
}