import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../fontAwesome/fontAwesome'

// Footer
export default ({footerData}) => {
    return (
        <footer>
            <div className="content-footer container">
                <div className="contact-footer">
                    <h3>CONTACT</h3>
                    {/* Alle contact informatie die in footerData weergeven. Om slechts 1 te gebruiken, kan je map vervangen door [0]*/}
                    <div className="contact-info">
                        { footerData.map( ({id, name, email, phoneNumber, facebookLink, instagramLink}) => 
                            <ul key={id}>
                                <li>
                                    <p>
                                        <FontAwesomeIcon icon="camera" />
                                        {name}
                                    </p>
                                </li>
                                <li>
                                    <a href={`mailto:${email}`} title="mail me">
                                        <FontAwesomeIcon icon="paper-plane" />
                                        {email}
                                    </a>
                                </li>
                                <li>
                                    <a href={`tel:${phoneNumber}`}>
                                        <FontAwesomeIcon icon="phone-alt" />
                                        {phoneNumber}
                                    </a>
                                </li>
                                {/* Links tonen naargelang ze aanwezig zijn*/}
                                { !facebookLink && !instagramLink ? '' : 
                                    <li>
                                        { facebookLink && 
                                            <a href={facebookLink} target='_blank'>
                                                <FontAwesomeIcon icon={['fab', 'facebook-f']} size='2x'/>    
                                            </a>
                                        }
                                        { instagramLink &&
                                            <a href={instagramLink} target='_blank'>
                                                <FontAwesomeIcon icon={['fab', 'instagram']} size='2x'/>
                                            </a>
                                        }
                                    </li>
                                }
                                
                            </ul>
                        )}
                    </div>
                    
                </div>
                <div className="info-footer">
                    {/* Alle links naar specifieke pagina's worden hier opgelijst */}
                    <h3>INFORMATIE</h3>
                    <ul>
                        <li>
                            <Link href="/contact"><a>Contacteer ons</a></Link>
                        </li>
                        <li>
                            <Link href="/algemene-voorwaarden"><a>Algemene voorwaarden</a></Link>
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