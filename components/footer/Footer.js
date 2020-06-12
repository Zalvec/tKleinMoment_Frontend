import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../fontAwesome/fontAwesome'

export default ({footerData}) => {
    console.log(footerData)
    return (
        <footer>
            <div className="content-footer container">
                <div className="contact-footer">
                    <h3>CONTACT</h3>
                    {/* Getting all the contactinfo out of the database. To restrict to one, use [0] instead op .map() */}
                    <div className="contact-info">
                        { footerData.map( contact => 
                            <ul key={contact.id}>
                                <li>
                                    <p>
                                        <FontAwesomeIcon icon="camera" />
                                        {contact.name}
                                    </p>
                                </li>
                                <li>
                                    <a href={`mailto:${contact.email}`} title="mail me">
                                        <FontAwesomeIcon icon="paper-plane" />
                                        {contact.email}
                                    </a>
                                </li>
                                <li>
                                    <a href={`tel:${contact.phoneNumber}`}>
                                        <FontAwesomeIcon icon="phone-alt" />
                                        {contact.phoneNumber}
                                    </a>
                                </li>
                                <li>
                                    <a href={contact.facebookLink} target='_blank'>
                                        <FontAwesomeIcon icon={['fab', 'facebook-f']} size='2x'/>    
                                    </a>
                                    <a href={contact.instagramLink} target='_blank'>
                                        <FontAwesomeIcon icon={['fab', 'instagram']} size='2x'/>
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                    
                </div>
                <div className="info-footer">
                    <h3>INFORMATIE</h3>
                    {/* TODO
                    Extra pagina's toevoegen zoals Gebruiksvoorwaarden, GDPR, etc. */}
                    <ul>
                        <li>
                            <Link href="/contact"><a>Contacteer ons</a></Link>
                        </li>
                        <li>
                            <Link href="/gebruiksvoorwaarden"><a>Gebruiksvoorwaarden</a></Link>
                        </li>
                        <li>
                            <Link href="/gdpr"><a>GDPR</a></Link>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="copyright-footer container">
                <p>	&copy; 2020 't Klein Moment</p>
            </div>
        </footer>
    )
}