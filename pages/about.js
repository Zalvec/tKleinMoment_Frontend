import axios from 'axios'
import Head from 'next/head'

import Layout from '../components/layout'

export default ({abouts}) => {
    return (
        <>
            <Head>
                <title>'t Klein Moment - About</title>
            </Head>

            <Layout>
                { abouts.filter( about => about.header === 'About me' ).map(aboutMe => (
                    <>
                        <h3>{aboutMe.header}</h3>
                        {aboutMe.text}
                    </>
                ))}

                <hr/>

                { abouts.filter( about => about.header !== 'About me' ).map( (aboutMe, index) => 
                    <>
                        { index%2 === 0 &&
                            <div>
                                <div>
                                    <h3>{aboutMe.header}</h3>
                                    {aboutMe.text}
                                </div>
                                <img src={`https://wdev.be/wdev_roel/eindwerk/img/about/${aboutMe.image}`} alt="" style={{ height:'150px', width:'150px'}}/>
                            </div>
                            ||
                            <div>
                                <img src={`https://wdev.be/wdev_roel/eindwerk/img/about/${aboutMe.image}`} alt="" style={{ height:'150px', width:'150px'}}/>
                                <div>
                                    <h3>{aboutMe.header}</h3>
                                    {aboutMe.text}
                                </div>
                            </div>
                        }
                    </>
                )}
            </Layout>
        </>
    )
}

// Alle biografie gegevens ophalen uit de database on build time en deze returnen aan de export default hierboven
export const getStaticProps = async () => {
    const response = await axios.get(`https://wdev.be/wdev_roel/eindwerk/api/abouts`, JSON)
    const aboutList = response.data['hydra:member']
    console.log(aboutList)

    return {
        props: {
            abouts: aboutList
        }
    }
}