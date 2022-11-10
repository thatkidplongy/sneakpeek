import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { urlFor } from '../lib/client'
import { ProductsModel } from '../interface/index-page/products'

type ProductProps = {
  product: ProductsModel
}

const Product = (props: ProductProps) => {
  const { image, name, slug, price } = props.product

  const productImage = urlFor(image && image[0]).url()

  return (
    <div>
      <Link href={`/product/${slug.current}`} className=''>
        <div className='ease-in-out duration-300 hover:scale-105'>
          <Image 
            src={productImage}
            alt='product-image'
            width={250}
            height={250}
            className='bg-slate-100 ease-in-out duration-300 rounded-lg'
          />
          <p className='font-normal'>{name}</p>
          <p className='font-bold mt-2 text-zinc-900'>PHP {price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product