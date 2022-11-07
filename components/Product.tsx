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
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <Image 
            src={productImage}
            alt='product-image'
            width={250}
            height={250}
            className='product-image'

          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>PHP {price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product