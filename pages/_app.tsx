import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'

import { Layout } from '../components'
import type { AppProps } from 'next/app'
import { StateContext } from '../context/StateContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Layout>
        <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
    
  )
}
