import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { urlFor } from '../lib/client'
import { BannerModel } from '../interface/index-page/bannerData'

type FooterBannerProps = {
  footerBanner: BannerModel
}

const FooterBanner = (props: FooterBannerProps) => {
  const { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image } = props.footerBanner

  const footerImage = urlFor(image).url()
  return (
    <div className='h-[400px] top-5 mt-20 pt-[50px] pr-[40px] bg-green-800 rounded-lg relative height-[450px] leading-4 text-white w-full'>
      <div className='flex justify-between'>
        <div>
          <p className='m-4 ml-6 text-lg'>{discount}</p>
          <h3 className='font-bold text-7xl ml-6'>{largeText1}</h3>
          <h3 className='font-bold text-7xl ml-6 mb-5'>{largeText2}</h3>
          <p className='m-4 ml-6 text-lg'>{saleTime}</p>
        </div>
        <div className='leading-5'>
          <p className='m-4 ml-6 text-lg'>{smallText}</p>
          <h3 className='font-bold text-7xl ml-6'>{midText}</h3>
          <p className='m-4 ml-6 text-lg'>{desc}</p>
        </div>

        <Image 
          src={footerImage}
          width={450}
          height={450}
          alt='footer-image'
          className='absolute top-[-25%] left-[30%]'
        />
      </div>
    </div>
  )
}

export default FooterBanner