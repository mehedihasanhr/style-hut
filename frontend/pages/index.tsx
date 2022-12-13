import React from 'react'

import Layout from '../components/Layout/Layout'
import Hero from '../sections/Hero'
import dynamic from 'next/dynamic'

const Products = dynamic(() => import('../sections/Products'))
const Banner = dynamic(() => import('../components/Ads/Banner'), {
  ssr: false,
})

export default function Home() {
  return (
    <Layout>
      <React.Fragment>
        <Hero />
        <Products heading="Men's Fations" />
        <Banner src="/banner-1.jpg" alt="banner" />
        <Products heading="Women's Fations" />
      </React.Fragment>
    </Layout>
  )
}
