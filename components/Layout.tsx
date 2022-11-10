import React from 'react'
import Head from 'next/head'

import Navbar from './Navbar'
import Footer from './Footer'

type LayoutProps = {
  children: any
}

const Layout = (props: LayoutProps) => {
  const { children } = props
  
  return (
    <div className='p-10 mb-5'>
      <Head>
        <title>SneakPeek</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='max-w-[1400px] m-auto w-full'> { children } </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout