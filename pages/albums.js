import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'
import { Grid } from '@material-ui/core'
import moment from 'moment'

import {slugify} from '../helper'
import Layout from '../components/layout'

export default ({albums}) => {
    console.log(albums)

    return (
        <>
            <Head>
                <title>'t Klein Moment - Albums</title>
            </Head>
            <Layout>
                <h1>Overview albums</h1>
                <Grid container spacing={4}>
                    { albums.map( ({active, id, name, cover, date}) => 
                        <>
                            { active &&
                                <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                                    <Link href={`/album/${id}/${slugify(name)}`}>
                                        <a>
                                            <p>{name}</p>
                                            <p>{moment(date).locale('nl').format("DD MMMM YYYY")}</p>
                                            <img key={id} style={{ maxHeight:'200px', width:'200px', overflow:'hidden'}} src={`https://wdev.be/wdev_roel/eindwerk/img/covers/${cover}`} alt=""/>
                                        </a>
                                    </Link>
                                </Grid>
                            }
                        </>
                    )}
                </Grid>
            </Layout>
        </>
)}

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