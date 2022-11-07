import React, { useState } from 'react'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { client, urlFor } from '../../lib/client'
import { ProductsModel } from '../../interface/index-page/products'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

type ProductDetailsProps = {
    products: ProductsModel[],
    product: ProductsModel
}

const ProductDetails = (props: ProductDetailsProps) => {
  const { image, name, details, price } = props.product

  const { decreaseQuantity, increaseQuantity, quantity, onAddToCart, setShowCart } = useStateContext() 

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
      className={ i === index ? 'small-image selected-image' : 'small-image'}
      src={urlFor(item).url()}
      alt='carousel-item'
      width={150}
      height={150}
      priority
      onMouseEnter={() => setIndex(i)}
    />
  ))

  const otherProducts = products && products.map((product)=> (
    <Product key={product._id} product={product} />
  ))

  return (
    <div>
        <div className="product-detail-container">
            <div>
                <div className='image-container'>
                    <Image
                      src={productImage}
                      alt='product-image'
                      width={450}
                      height={450}
                      className='product-detail-image'
                      priority
                    />
                </div>
                <div className="small-images-container">
                  {imageCarousel}
                </div>
            </div>
            <div className="product-detail-desc">
              <h1>{name}</h1>
              <div className="reviews">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                <p>
                  (20)
                </p>
              </div>
              <h4>Details: </h4>
              <p>{details}</p>
              <p className="price">${price}</p>
              <div className="quantity">
                <h3>Quantity: </h3>
                <p className="quantity-desc">
                  <span className="minus" onClick={decreaseQuantity}> <AiOutlineMinus /> </span>
                  <span className="num">{quantity}</span>
                  <span className="plus" onClick={increaseQuantity}> <AiOutlinePlus /> </span>
                </p>
              </div>

              <div className="buttons">
                <button type='button' className='add-to-cart' onClick={() => onAddToCart(product, quantity)}>
                  Add to Cart
                </button>
                <button type='button' className='buy-now' onClick={handleBuyNow}>
                  Buy Now
                </button>
            </div>
          </div>
        </div>

        <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
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