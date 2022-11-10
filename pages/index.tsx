import React from 'react'

import { ProductsModel } from '../interface/index-page/products'
import { BannerModel } from '../interface/index-page/bannerData'

import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'

type indexPageProps = {
  bannerData: BannerModel[],
  products: ProductsModel[]
}

const Home = (props: indexPageProps) => {
  const { bannerData, products } = props

  const productsList = products.map(product => (
    <Product key={product._id} product={product} />
  ))

  const heroBannerData = bannerData

  const footerBanner = bannerData && bannerData[0]

  return (
    <>
      <HeroBanner heroBanner = { heroBannerData } />

      <div className='text-center my-10 mr-0 text-sky-900'>
        <h2 className='text-3xl font-[800]'>Best selling product</h2>
        <p className='text-base font-[200]'>Speakers of many variations</p>
      </div>

      <div className='flex flex-wrap justify-center gap-5 mt-5 w-full'>
        { productsList }
      </div>

      <FooterBanner footerBanner={footerBanner}/>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {
      products,
      bannerData,
    }
  }

}

export default Home