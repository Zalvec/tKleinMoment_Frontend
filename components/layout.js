import useSecurity from '../useSecurity'
import Head from 'next/head'
import Link from 'next/link'


export default ({ children }) => {
    const { isLoggedIn } = useSecurity()

    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <Link href="/"><a>'t Klein Moment</a></Link>
                <Link href="/albums"><a>Albums</a></Link>
                <Link href="/biografie"><a>Biografie</a></Link>
                <Link href="/contact"><a>Contact</a></Link>
                { !isLoggedIn && 
                    <Link href="/login"><a>Login</a></Link>
                    ||
                    // Sublinks naar Account, Favorieten en Afmelden
                    <Link href="/profiel"><a>Profiel</a></Link>
                }
                <hr/>
            </header>

            <main>{children}</main>

            <footer>
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
            </footer>
        </div>
    )
  }
  