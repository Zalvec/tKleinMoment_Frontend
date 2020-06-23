import Link from 'next/link'
import { Grid, Typography } from '@material-ui/core'
import moment from 'moment'

import {slugify} from '../../helpers/slugify'

export default ({albums}) => {
    return (
        <div className='albums container'>
            <Typography component='h1' variant='h5'>
                Overzicht albums
            </Typography>
            <div>
                {/* Alle albums mappen en tonen in een grid structuur */}
                <Grid container spacing={0}>
                    { albums.map( ({active, id, name, cover, date}) => 
                        <>
                            { active &&
                                <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
                                    {/* Link naar het album waarop geklikt is */}
                                    <Link href={`/album/${id}/${slugify(name)}`}>
                                        <a>
                                            <div>
                                                {/* image.php zorgt ervoor dat de opgehaalde foto's met kleinere resolutie getoond worden op de pagina */}
                                                <img key={id} alt={`Cover image for ${name}`} src={`${process.env.NEXT_PUBLIC_BASE}image.php?${cover}&width=300&height=300&cropratio=1:1&image=/wdev_roel/eindwerk/system/img/covers/${cover}`} />
                                                {/* moment zet de datum die binnenkomt als 2020-05-10T00:00:00+02:00 om in een leesbare datum 10 mei 2020 */}
                                                <Typography component='p' variant='h5'>{name} - {moment(date).locale('nl').format("DD MMMM YYYY")}</Typography>
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