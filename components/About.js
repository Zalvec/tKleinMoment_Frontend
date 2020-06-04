export default ({abouts}) => {
    return (
        <>
            { abouts.filter( about => about.header === 'About me' ).map(aboutMe => (
                <>
                    <h3>{aboutMe.header}</h3>
                    <div dangerouslySetInnerHTML={{__html: aboutMe.text}}></div>
                </>
            ))}

            <hr/>

            { abouts.filter( about => about.header !== 'About me' ).map( (aboutMe, index) => 
                <>
                    { index%2 === 0 &&
                        <div>
                            <div>
                                <h3>{aboutMe.header}</h3>
                                <div dangerouslySetInnerHTML={{__html: aboutMe.text}}></div>
                            </div>
                            <img key={aboutMe.id} src={`https://wdev.be/wdev_roel/eindwerk/img/about/${aboutMe.image}`} alt="" style={{ height:'150px', width:'150px'}}/>
                        </div>
                        ||
                        <div>
                            <img key={aboutMe.id} src={`https://wdev.be/wdev_roel/eindwerk/img/about/${aboutMe.image}`} alt="" style={{ height:'150px', width:'150px'}}/>
                            <div>
                                <h3>{aboutMe.header}</h3>
                                <div dangerouslySetInnerHTML={{__html: aboutMe.text}}></div>
                            </div>
                        </div>
                    }
                </>
            )}
        </>
    )
}