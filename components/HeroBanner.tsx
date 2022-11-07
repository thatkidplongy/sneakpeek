import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { BannerModel } from '../interface/index-page/bannerData'

import { urlFor } from '../lib/client'

type HeroBannerDataProps = {
  heroBanner: BannerModel[];
}

const HeroBanner = ( props: HeroBannerDataProps) => {
  const { heroBanner } = props 

  const banner = heroBanner.map((banner, index)=> {
    const image = urlFor(banner.image).url()
    
    return (
      <div className='hero-banner-container' key={index}>
        <p className='beats-solo'>{banner.smallText}</p>
        <h3>{banner.midText}</h3>
        <h1>{banner.largeText1}</h1>
        <Image
          src={image}
          alt="shoes"
          width={450}
          height={450}
          className='hero-banner-image'
        />
  
         <div>
          <Link
            href={`/product/${banner.product}`}
          >
            <button
              type='button'
              className=''
            >
              {banner.buttonText}
            </button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{banner.desc}</p>
          </div>
        </div> 
      </div>
    )
  }
  )


  return (
    <div className=''>
      { banner }
    </div>
  )
}

export default HeroBanner