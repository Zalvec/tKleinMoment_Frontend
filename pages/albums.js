import axios from 'axios'
import Link from 'next/link'
import {slugify} from '../helper'

import Layout from '../components/layout'

export default ({albums}) => {
    console.log(albums)
    return (
        <Layout>
            <h1>Overview albums</h1>
            <ul>
                { albums.map( album => 
                    <li key={album.id}> 
                        {album.name} - - {album.location} 
                        <Link href={`/album/${album.id}/${slugify(album.name)}`}>
                            <a>meer info</a>
                        </Link>
                    </li> 
                )}
            </ul>
        </Layout>
    )
}

// Alle albums ophalen uit de database on build time en deze returnen aan de export default hierboven
export const getStaticProps = async () => {
    const response = await axios.get(`https://wdev.be/wdev_roel/eindwerk/api/albums`, JSON)
    const albumList = response.data['hydra:member']

    return {
        props: {
            albums: albumList
        }
    }
}