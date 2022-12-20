import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import '../styles/uicons-regular-rounded/css/uicons-regular-rounded.css'
import '../styles/uicons-solid-straight/css/uicons-solid-straight.css'
import '../styles/uicons-solid-rounded/css/uicons-solid-rounded.css'
import '../styles/uicons-solid-straight/css/uicons-solid-straight.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
