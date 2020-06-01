import axios from 'axios'
import { useRouter } from 'next/router'
import {slugify} from '../../../helper'

import Layout from '../../../components/layout'

export default ({album}) => {
    console.log(album)

    const router = useRouter()

    // Toont loading als de pagina nog niet gebuild is en door fallback gegerereerd word
    if (router.isFallback){
        return <div>Loading...</div>
    }
    
    return (
        <Layout>
            <h1>Album</h1>
            <p>{album.name}</p>
            <p>{album.date}</p>
            {/* Toont enkel images als er images in het album staan */}
            { album.images.length !== 0 
                &&
                <ul>
                    { album.images.map( 
                        ({image, alt, description, active, id}) => 
                            (   
                                <>
                                    {/* Toont enkel images die actief staan in de database */}
                                    { active && 
                                        <li key={id}>
                                            <img src={`https://wdev.be/wdev_roel/eindwerk/img/albums/${image}`} alt={alt} width='80px'/>
                                            <p>{image}</p>
                                            <p>{description}</p>
                                        </li>
                                    }
                                </>
                            )
                    )}
                </ul>
                ||
                <p>No images in this album</p>
            }
                       
        </Layout>
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
    
    return {
        props: {
            album: albumDetail
        }
    }
}