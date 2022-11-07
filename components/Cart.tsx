import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { ProductsModel } from '../interface/index-page/products';
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext()

  const isEmptyCart = cartItems.length < 1

  const handleCheckout = async () => {
    const stripe = await getStripe()
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(cartItems)
    })

    if(response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...')

    stripe.redirectToCheckout({ sessionId: data.id})
  }

  const emptyCart = isEmptyCart && (
    <div className="empty-cart">
      <AiOutlineShopping size={150} />
      <h4>Your shopping bag is empty</h4>
      <Link href='/'>
        <button
          type='button'
          className='btn'
          onClick={() => setShowCart(false)}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  const cartProducts = !isEmptyCart && cartItems.map((item) => (
    <div className="product" key={item._id}>
      <Image
        src={urlFor(item?.image[0]).url()}
        alt='cart-product-image'
        className='cart-product-image'
        width={200}
        height={200}
      >

      </Image>
      <div className="item-desc">
        <div className="flex top">
          <h4>{item.name}</h4>
          <h4>PHP {item.price}</h4>
        </div>
        <div className="flex bottom">
          <div>
          <p className="quantity-desc">
            <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'decrement')}> <AiOutlineMinus /> </span>
            <span className="num">{item.quantity}</span>
            <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'increment')}><AiOutlinePlus /></span>
          </p>
          </div>
          <button type='button' className='remove-item' onClick={() => onRemove(item)}>
            <TiDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  ))

  const subTotal = !isEmptyCart && (
    <div className="cart-bottom">
      <div className="total">
        <h4>Subtotal: </h4>
        <h4>PHP {totalPrice}</h4>
      </div>
      <div className="btn-container">
        <button type='button' className='btn' onClick={handleCheckout}>
          Pay with Stripe
        </button>
      </div>
    </div>
  )

  return (
    <div className='cart-wrapper' ref={cartRef}>
        <div className="cart-container">
          <button
           type='button'
           className='cart-heading'
           onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft />
            <span className='heading'>Your Cart</span>
            <span className='cart-num-items'>({totalQuantities} items)</span>
           </button>

          { emptyCart }

          <div className="product-container">
            { cartProducts }
          </div>
          { subTotal }
        </div>
    </div>
  )
}

export default Cart