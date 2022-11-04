import { Alert } from '@/Components/utility'
import { AuthProvider } from '@/Contexts/useAuth'
import { GlobalProvider } from '@/Contexts/useGlobals'
import '@/Styles/globals.css'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
        <Alert />
      </AuthProvider>
    </GlobalProvider>
  )
}

export default MyApp
