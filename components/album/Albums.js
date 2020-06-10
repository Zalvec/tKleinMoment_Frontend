import Link from 'next/link'
import { Grid, Typography } from '@material-ui/core'
import moment from 'moment'

import {slugify} from '../../helpers/slugify'

export default ({albums}) => {
    console.log(albums)

    return (
        <div className='albums container'>
            <Typography component='h1' variant='h5'>
                Overview albums
            </Typography>
            <div>
                <Grid container spacing={0}>
                    { albums.map( ({active, id, name, cover, date}) => 
                        <>
                            { active &&
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Link href={`/album/${id}/${slugify(name)}`}>
                                        <a>
                                            <div>
                                                <img key={id} alt={`Cover image for ${name}`} src={`https://wdev.be/wdev_roel/eindwerk/image.php?${cover}&width=600&height=600&cropratio=1:1&image=/wdev_roel/eindwerk/system/img/covers/${cover}`} />
                                                <Typography component='p' variant='h5'>{name} - {moment(date).locale('nl').format("DD MMMM YYYY")}</Typography>
                                                {/* <Typography component='p' variant='p'>{moment(date).locale('nl').format("DD MMMM YYYY")}</Typography> */}
                                            </div>
                                        </a>
                                    </Link>
                                </Grid>
                            }
                        </>
                    )}  
                </Grid>
                
            </div>
        </div>
)}