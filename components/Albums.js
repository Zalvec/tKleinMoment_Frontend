import Link from 'next/link'
import { Grid } from '@material-ui/core'
import moment from 'moment'

import {slugify} from '../helpers/slugify'

export default ({albums}) => {
    console.log(albums)

    return (
        <>
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
        </>
)}