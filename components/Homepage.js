import Slider from '../components/slider/Slider'

// Startpagina met slider van foto's
export default ({imageList}) => {
    return (
        <div className="container">
            <Slider imageList={imageList}/>
        </div>
    )
}