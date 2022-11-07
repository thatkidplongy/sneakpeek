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
    <div className='layout'>
      <Head>
        <title>SneakPeek</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'> { children } </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout