import { useState, useEffect } from 'react'

// Slider op index.js
export default ({imageList}) => {
    // variabelen setten
    const [images, setImages] = useState(imageList)
    const [position, setPosition] = useState(0)

    // Na x aantal seconden veranderd de positie. De positie bepaald welke foto getoond word
    useEffect( () => {
        const id = setTimeout( () => {
            position === imageList.length - 1 ? setPosition(0) : setPosition(position+1) 
        }, 3000)
        return () => clearTimeout(id)
    }, [position])

    return (
        <div className='slider'>
            {
                // alle images tonen op de pagina
                images.map( (img, i) => 
                    // afhangelijk van de positie krijgt de image een class. Enkel die met de class show wordt weergegeven
                    // image.php zorgt ervoor dat de opgehaalde foto's met kleinere resolutie getoond worden op de pagina
                    <img className={ i === position ? 'show' : 'hidden' }
                    key={img.id} alt={img.alt} src={`https://wdev.be/wdev_roel/eindwerk/image.php?${img.image}&height=700&image=/wdev_roel/eindwerk/system/img/albums/${img.image}`} />)
            }
        </div>
    )
}