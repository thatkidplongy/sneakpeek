import React, { useState } from 'react'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { client, urlFor } from '../../lib/client'
import { ProductsModel } from '../../interface/index-page/products'
import { AppContextModel } from '../../interface/index-page/AppContext'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

type ProductDetailsProps = {
    products: ProductsModel[],
    product: ProductsModel
}

const ProductDetails = (props: ProductDetailsProps) => {
  const { image, name, details, price } = props.product

  const { decreaseQuantity, increaseQuantity, quantity, onAddToCart, setShowCart } = useStateContext() as AppContextModel

  const [index, setIndex] = useState(0)

  const { products, product } = props

  const productImage = urlFor(image && image[index]).url()

  const handleBuyNow = () => {
    onAddToCart(product, quantity);
    

    setShowCart(true)
  }

  const imageCarousel = image?.map((item, i) => (
    <Image
      key={i}
      className={ i === index ? 'round-md bg-slate-300 w-[70px] h-[70px] cursor-pointer hover:bg-red-400' : 'round-md bg-slate-300 w-[70px] h-[70px] cursor-pointer'}
      src={urlFor(item).url()}
      alt='carousel-item'
      width={150}
      height={150}
      priority
      onMouseEnter={() => setIndex(i)}
    />
  ))

  const otherProducts = products && products.map((product)=> (
    <Product key={product._id} product={product}/>
  ))

  return (
    <div>
        <div className="flex gap-[40px] m-[40px] mt-[60px] text-sky-900">
            <div>
                <div>
                    <Image
                      src={productImage}
                      alt='product-image'
                      width={450}
                      height={450}
                      className='rounded-md bg-slate-200 hover:animate-pulse cursor-pointer transition ease-in-out hover:bg-red-400'
                      priority
                    />
                </div>
                <div className="flex gap-[10px] mt-[20px]">
                  {imageCarousel}
                </div>
            </div>
            <div className="product-detail-desc">
              <h1 className='text-5xl'>{name}</h1>
              <div className="text-red-600 mt-[10px] flex gap-[5px] items-center">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                <p className='text-sky-600 mb-3'>
                  (20)
                </p>
              </div>
              <h4 className='mt-[10px]'>Details: </h4>
              <p className='mt-[10px]'>{details}</p>
              <p className="font-bold text-[26px] mt-[30px]">${price}</p>
              <div className="flex gap-[20px] mt-[10px] items-center">
                <h3>Quantity: </h3>
                <p className="flex items-center border-2 border-solid border-gray-400 p-2 h-[60px]">
                  <span className="cursor-pointer p-2 text-[20px] border-r-2 border-solid border-gray-500 text-red-500" onClick={decreaseQuantity}> <AiOutlineMinus /> </span>
                  <span className="text-[15px] p-2 border-r-2 border-solid border-gray-500">{quantity}</span>
                  <span className="cursor-pointer p-2 text-[20px] text-green-500" onClick={increaseQuantity}> <AiOutlinePlus /> </span>
                </p>
              </div>

              <div className="flex gap-[30px]">
                <button type='button' className='pr-3 h-[45px] border-2 text-cyan-600 border-solid border-cyan-500 mt-[40px] text-[18px] font-bold bg-white cursor-pointer w-[200px] ease-in duration-300 hover:scale-110 hover:bg-cyan-500 hover:text-white' onClick={() => onAddToCart(product, quantity)}>
                  Add to Cart
                </button>
                <button type='button' className='pr-3 h-[45px] border-2 text-indigo-600 border-solid border-indigo-500 mt-[40px] text-[18px] font-bold bg-white cursor-pointer w-[200px] ease-in duration-300 hover:scale-110 hover:bg-indigo-500 hover:text-white' onClick={handleBuyNow}>
                  Buy Now
                </button>
            </div>
          </div>
        </div>

        <div className="mt-[120px]">
          <h2 className='text-center m-[50px] text-sky-900 text-[28px]'>You may also like</h2>
          <div className="relative h-[400px] w-full overflow-x-hidden">
            <div className="flex justify-center w-full gap-[15px] absolute whitespace-nowrap will-change-transform animate-marquee hover:pause">
              { otherProducts }
            </div>
          </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`

  const products = await client.fetch(query);

  const paths = products.map((product: { slug: { current: any } }) => ({
    params: {
      slug: product.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}


export const getStaticProps = async (props: { params: any }) => {
    const { params: { slug } } = props 
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`

    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query)

    const products = await client.fetch(productsQuery)
  
    return {
      props: {
        product,
        products,
      }
    }
  
  }
  

export default ProductDetails