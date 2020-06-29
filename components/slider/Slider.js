import { useState, useEffect } from 'react'

// Slider op index.js (startpagina)
export default ({imageList}) => {
    // variabelen setten
    const [images, setImages] = useState(imageList)
    const [position, setPosition] = useState(0)

    // Random nummer verschillend van huidig nummer
    const randomNumber = (except) => {
        let num = Math.floor(Math.random() * imageList.length)
        return (num === except) ? randomNumber() : num
    }

    // Na 3 seconden veranderd de positie. De positie bepaald welke foto getoond word
    useEffect( () => {
        const id = setTimeout( () => {
            setPosition(randomNumber(position))
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
                    key={img.id} alt={img.alt} 
                    src={`${process.env.NEXT_PUBLIC_BASE}image.php?${img.image}&height=700&image=/wdev_roel/eindwerk/system/img/albums/${img.image}`} />)
            }
        </div>
    )
}