import { AuthProvider } from '@/Contexts/useAuth'
import { GlobalProvider } from '@/Contexts/useGlobals'
import '@/Styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </GlobalProvider>
  )
}

export default MyApp
