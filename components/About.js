export default ({abouts}) => {
    return (
        <>
            { abouts.filter( about => about.header === 'About me' ).map(aboutMe => (
                <>
                    <h3>{aboutMe.header}</h3>
                    <div dangerouslySetInnerHTML={{__html: aboutMe.text}}></div>
                </>
            ))}

            { abouts.filter( about => about.header !== 'About me' ).map( (aboutMe, index) => 
                <>
                    { index%2 === 0 &&
                        <div>
                            <div>
                                <h3>{aboutMe.header}</h3>
                                <div dangerouslySetInnerHTML={{__html: aboutMe.text}}></div>
                            </div>
                            <img key={aboutMe.id} alt={`illustration for section ${aboutMe.header}`} src={`https://wdev.be/wdev_roel/eindwerk/image.php?${aboutMe.image}&width=200&height=200&image=/wdev_roel/eindwerk/system/img/about/${aboutMe.image}`} />
                        </div>
                        ||
                        <div>
                            <img key={aboutMe.id} alt={`illustration for section ${aboutMe.header}`} src={`https://wdev.be/wdev_roel/eindwerk/image.php?${aboutMe.image}&width=200&height=200&image=/wdev_roel/eindwerk/system/img/about/${aboutMe.image}`} />
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