import Link from 'next/link'

export default ({footerData}) => {
    console.log(footerData)
    return (
        <>
            <hr/>
            <div>
                <h3>CONTACT</h3>
                {/* Getting all the contactinfo out of the database. To restrict to one, use [0] instead op .map() */}
                { footerData.map( contact => 
                    <>
                        <p>{contact.email}</p>
                        <p>{contact.name}</p>
                        <p>{contact.phoneNumber}</p>
                        <a href={contact.facebookLink} target='_blank'>{contact.facebookLink}</a>
                        <a href={contact.instagramLink} target='_blank'>{contact.instagramLink}</a>
                    </>
                )}
            </div>
            <div>
                <h3>INFORMATIE</h3>
                {/* TODO
                Extra pagina's toevoegen zoals Gebruiksvoorwaarden, GDPR, etc. */}
                <Link href="/contact"><a>Contacteer ons</a></Link>
                <Link href="/gebruiksvoorwaarden"><a>Gebruiksvoorwaarden</a></Link>
                <Link href="/gdpr"><a>GDPR</a></Link>
                <p>	&copy; 't Klein Moment</p>
            </div>
        </>
    )
}