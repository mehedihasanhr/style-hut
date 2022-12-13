import React from 'react'
import dynamic from 'next/dynamic'
const Footer = dynamic(() => import('../Footer'))
import Navbar from '../Navbar'
import { TopNavbar } from '../Navbar/TopNav'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <TopNavbar />
      <Navbar />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default Layout
