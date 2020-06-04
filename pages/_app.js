import App from 'next/app'
import '../css/style.scss';

function MyApp(props) {
    const { Component, pageProps } = props
    return (
        <Component {...pageProps} />
    )
}

export default MyApp