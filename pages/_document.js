import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                    <link rel="shortcut icon" href="/assets/icons/favicon.png" type="image/x-icon" />
                    {/* Meta Data */}
                    <meta name="application-name" content="Payabl" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="Payabl" />
                    <meta name="description" content="Payabl - Take control of your personal finances" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="msapplication-config" content="/assets/payabl.png" />
                    <meta name="msapplication-TileColor" content="#2B5797" />
                    <meta name="msapplication-tap-highlight" content="no" />
                    <meta name="theme-color" content="#000000" />

                    <link rel="apple-touch-icon" href="/assets/payabl.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/assets/payabl.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/assets/payabl.png" />
                    <link rel="apple-touch-icon" sizes="167x167" href="/assets/payabl.png" />

                    <link rel="icon" type="image/png" sizes="32x32" href="/assets/payabl.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/assets/payabl.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="mask-icon" href="/assets/payabl.png" color="#5bbad5" />

                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:url" content="https://payabl.vercel.app" />
                    <meta name="twitter:title" content="Payabl" />
                    <meta name="twitter:description" content="Payabl - Take control of your personal finances" />
                    <meta name="twitter:image" content="https://payabl.vercel.app/assets/payabl.png" />
                    <meta name="twitter:creator" content="@TrehanSangpriya" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Payabl" />
                    <meta property="og:description" content="Payabl - Take control of your personal finances" />
                    <meta property="og:site_name" content="Payabl" />
                    <meta property="og:url" content="https://payabl.vercel.app" />
                    <meta property="og:image" content="https://payabl.vercel.app/assets/payabl.png" />


                    <link rel='apple-touch-startup-image' href='/assets/payabl.png' sizes='2048x2732' />
                    <link rel='apple-touch-startup-image' href='/assets/payabl.png' sizes='1668x2224' />
                    <link rel='apple-touch-startup-image' href='/assets/payabl.png' sizes='1536x2048' />
                    <link rel='apple-touch-startup-image' href='/assets/payabl.png' sizes='1125x2436' />
                    <link rel='apple-touch-startup-image' href='/assets/payabl.png' sizes='1242x2208' />
                    <link rel='apple-touch-startup-image' href='/assets/payabl.png' sizes='750x1334' />
                    <link rel='apple-touch-startup-image' href='/assets/payabl.png' sizes='640x1136' />

                </Head>
                <body className='bg-layout-100 sm:select-none'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument