import axios from 'axios'
import { useRouter } from 'next/router'
import { LinearProgress } from '@material-ui/core'

import {slugify} from '../../../helpers/slugify'
import Layout from '../../../components/layout'
import AlbumDetail from '../../../components/album/AlbumDetail'

export default ({album, footerData}) => {
    const router = useRouter()

    // Toont loading als de pagina nog niet gebuild is en door fallback gegerereerd word
    if (router.isFallback){
        return <LinearProgress />
    }
    
    return (
        <>
            <Layout footerData={footerData} title={`'t Klein Moment - ${album.name}`}>
                <AlbumDetail album={album}/>
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

    /* Footer data ophalen */
    const getFooterData = require('../../../components/footer/FooterData')
    
    return {
        props: {
            album: albumDetail,
            footerData: await getFooterData()
        }
    }
}