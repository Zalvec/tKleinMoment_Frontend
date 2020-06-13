import Slider from '../components/slider/Slider'

export default ({imageList}) => {

    return (
        <>
            <div className="container">
                <Slider imageList={imageList}/>
            </div>
        </>
    )
}