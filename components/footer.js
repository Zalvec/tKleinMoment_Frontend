import Link from 'next/link'

export default () => {
    return (
        <>
            <hr/>
            <div>
                <h3>CONTACT</h3>
                {/* TODO
                Contact gegevens ophalen uit database */}
            </div>
            <div>
                <h3>INFORMATIE</h3>
                {/* TODO
                Extra pagina's toevoegen zoals Gebruiksvoorwaarden, GDPR, etc. */}
                <Link href="/contact"><a>Contacteer ons</a></Link>
                <p>	&copy; 't Klein Moment</p>
            </div>
        </>
    )
}