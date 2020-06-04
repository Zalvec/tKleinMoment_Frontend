import Link from 'next/link'

import useSecurity from '../useSecurity'

export default () => {
    const { isLoggedIn } = useSecurity()

    return ( 
        <>
            <Link class="title" href="/"><a>'t Klein Moment</a></Link>
            <div>
                <Link class="navbar" href="/about"><a>About</a></Link>
                <Link class="navbar" href="/albums"><a>Albums</a></Link>
                <Link class="navbar" href="/contact"><a>Contact</a></Link>
                { !isLoggedIn &&
                    <Link class="navbar" href="/login"><a>Login</a></Link>
                    ||
                    <>
                        <Link class="navbar" href="/profiel"><a>Profiel</a></Link>
                        <Link class="navbar" href="/favorieten"><a>Favorieten</a></Link>
                        <Link class="navbar" href="/logout"><a>Logout</a></Link>
                    </>
                }
            </div>
        </>
    )
}