import { useState, useEffect } from 'react'

export default ({imageList}) => {
    const [images, setImages] = useState(imageList)
    const [position, setPosition] = useState(0)

    useEffect( () => {
        const id = setTimeout( () => {
            position === imageList.length - 1 ? setPosition(0) : setPosition(position+1) 
        }, 3000)
        return () => clearTimeout(id)
    }, [position])

    return (
        <div className='slider'>
            {
                images.map( (img, i) => 
                    <img className={ i === position ? 'show' : 'hidden' }
                    key={img.id} alt={img.alt} src={`https://wdev.be/wdev_roel/eindwerk/image.php?${img.image}&height=900&image=/wdev_roel/eindwerk/system/img/albums/${img.image}`} />)
                    // key={img.id} alt={img.alt} src={`https://wdev.be/wdev_roel/eindwerk/system/img/albums/${img.image}`} />)
            }
        </div>
    )
}