import useSecurity from '../customHooks/useSecurity'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../fontAwesome/fontAwesome'

import Slider from '../components/slider/Slider'

export default ({footerData, imageList}) => {
    const { isLoggedIn } = useSecurity()
    console.log(footerData)

    return (
        <>
            <div className="container">
                <Slider imageList={imageList}/>
            </div>
        </>
    )
}