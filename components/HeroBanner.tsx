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
      <div className='pt-24 pr-10 bg-gray-300 rounded-md relative h-[500px] w-full leading-3' key={index}>
        <p className='text-xl ml-6'>{banner.smallText}</p>
        <h3 className='text-8xl mt-2 ml-7'>{banner.midText}</h3>
        <h1 className='text-white uppercase text-9xl ml-6'>{banner.largeText1}</h1>
        <Image
          src={image}
          alt="shoes"
          width={450}
          height={450}
          className='absolute top-5 right-[30%] object-center width-[450px] height-[450px]'
        />
  
         <div>
          <div className='absolute right-20 bottom-20 width-[300px] flex flex-col text-sky-900 justify-end items-end'>
            <h5 className='mb-6 font-semibold text-2xl self-end'>Description</h5>
            <p className='text-gray font-normal text-end text-lg'>{banner.desc}</p>
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