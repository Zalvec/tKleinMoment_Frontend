import useSecurity from '../useSecurity'
import { useState, useEffect } from 'react'
import Slider from '../components/slider/Slider'

export default ({footerData, imageList}) => {
    const { isLoggedIn } = useSecurity()
    console.log(footerData)

    return (
        <>
            <div className="container">
                <main>
                <h1>Start of 't Klein Moment</h1>
                {/* TODO: Carousel of images */}
                {/* <div style={{backgroundImage:`url(${img})`, height:'100px'}}>
                </div> */}
                <Slider imageList={imageList}/>
                
                {/* TODO: Adding FB & instagram logo-link */}
                { footerData.length === 1 && 
                    footerData.map( contact => 
                        <>  
                            <p>{contact.facebookLink}</p>
                            <p>{contact.instagramLink}</p>
                        </>
                    )
                    ||
                    footerData.map( contact => 
                        <>  
                            <p>{contact.name}</p>
                            <p>{contact.facebookLink}</p>
                            <p>{contact.instagramLink}</p>
                        </>
                    )
                }
                
                {isLoggedIn && <p>INGELOGD</p> || <p>BEZOEKER</p>}
                </main>
            </div>
        </>
    )
}



// const images = [
    //     "https://dummyimage.com/600x400/c72ec7/1623de&text=Foto1",
    //     "https://dummyimage.com/600x400/3041c7/16de7d&text=Foto2",
    //     "https://dummyimage.com/600x400/7f32c7/de7016&text=Foto3"
    // ]

    // const [img, setImg] = useState(images[0])
    
    // useEffect( () => {
    //     setInterval( () => {
    //         if(img === "https://dummyimage.com/600x400/c72ec7/1623de&text=Foto1") {
    //             setImg(images[1])
    //         } else if (img === "https://dummyimage.com/600x400/3041c7/16de7d&text=Foto2") {
    //             setImg(images[2])
    //         } else {
    //             setImg(images[0])
    //         }
    //     }, 1000)
    // })