import axios from 'axios'
import { useRouter } from 'next/router'
import { Card, CardContent, Typography, CardMedia, LinearProgress } from '@material-ui/core'

import {slugify} from '../../../helpers/slugify'
import Layout from '../../../components/layout'

export default ({album, footerData}) => {
    console.log(album)

    const router = useRouter()

    // Toont loading als de pagina nog niet gebuild is en door fallback gegerereerd word
    if (router.isFallback){
        return <LinearProgress />
    }
    
    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - ${album.name}`}>
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
                                            <CardMedia image={`https://wdev.be/wdev_roel/eindwerk/img/albums/${image}`} alt={alt} style={{ height:"140px", width:"140px" }}/>
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
            </Layout>
        </>
    )
}

// Dynamisch alle album/id/slug pagina's maken on build time
export const getStaticPaths = async () => {
    const albumListResponse = await axios.get(`https://wdev.be/wdev_roel/eindwerk/api/albums?properties%5B%5D=id&properties%5B%5D=name`)
    const albumList = albumListResponse.data['hydra:member']

    // Voor elke album een {params: {...}} aanmaken met zijn id en slug
    const paramList = albumList.map( album => (
        {params: {id: `${album.id}`, slug: slugify(album.name)}}
    ))

    return {
        paths: paramList,
        fallback: true      // indien er een nieuw album is en nog niet door een build is gegenereerd, zal de fallback deze genereren bij het eerste bezoek
    }
}

// On build time alle informatie van een album ophalen en returnen als prop naar de export default hierboven
export const getStaticProps = async (req) => {
    const id = req.params.id
    const albumDetailResponse = await axios.get(`https://wdev.be/wdev_roel/eindwerk/api/albums/` + id)
    const albumDetail = albumDetailResponse.data

    const getFooterData = require('../../../helpers/footerData')
    
    return {
        props: {
            album: albumDetail,
            footerData: await getFooterData()
        }
    }
}