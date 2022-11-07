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
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link
            href={`product/${product}`}
          >
            <button type='button'>{buttonText}</button>
          </Link>
        </div>

        <Image 
          src={footerImage}
          width={450}
          height={450}
          alt='footer-image'
          className='footer-banner-image'
        />
      </div>
    </div>
  )
}

export default FooterBanner