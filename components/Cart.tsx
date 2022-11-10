import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { ProductsModel } from '../interface/index-page/products';
import { AppContextModel } from '../interface/index-page/AppContext'
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext() as AppContextModel

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
    
    if(response.status === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...')

    stripe.redirectToCheckout({ sessionId: data.id})
  }

  const emptyCart = isEmptyCart && (
    <div className="m-[40px] text-center">
      <AiOutlineShopping size={150} className='m-auto'/>
      <h4 className='font-bold text-[20px]'>Your shopping bag is empty</h4>
      <Link href='/'>
        <button
          type='button'
          className='w-full max-w-[300px] rounded-md border-none text-[20px] p-2 mt-[40px] uppercase bg-green-800 text-white cursor-pointer ease-in-out duration-300 scale-100 hover:scale-105'
          onClick={() => setShowCart(false)}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  const cartProducts = !isEmptyCart && cartItems.map((item) => (
    <div className="flex gap-[30px] p-[20px] pr-[5px]" key={item._id}>
      <Image
        src={urlFor(item?.image[0]).url()}
        alt='cart-product-image'
        className='w-[25%] h-[25%]'
        width={200}
        height={200}
      >

      </Image>
      <div className="flex flex-col">
        <div className="flex flex-row gap-20 justify-between text-sky-900">
          <div className='text-lg'>{item.name}</div>
          <div className='text-lg'>PHP {item.price}</div>
        </div>
        <div className="flex justify-between items-center mt-[30px]">
          <div>
          <p className="flex p-[12px] border-2 border-solid border-gray-500 gap-3">
            <span className="cursor-pointer text-[20px] pt-[6px] pr-[12px] border-r-2 border-solid border-gray-500 text-red-500" onClick={() => toggleCartItemQuantity(item._id, 'decrement')}> <AiOutlineMinus /> </span>
            <span className="text-[25px] pt-[6px] pr-[12px] border-r-2 border-solid border-gray-500">{item.quantity}</span>
            <span className="cursor-pointer text-[20px] pt-[6px] text-green-500" onClick={() => toggleCartItemQuantity(item._id, 'increment')}><AiOutlinePlus /></span>
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
    <div className="absolute bottom-7 w-full pt-[30px] pr-[15px]">
      <div className="flex justify-between">
        <h4 className='text-md ml-4'>Subtotal: </h4>
        <h4 className='text-md mr-4'>PHP {totalPrice}</h4>
      </div>
      <div className="w-[400px] m-auto">
        <button type='button' className='w-full max-w-[400px] text-center py-2 rounded-md border-none text-[20px] mt-[30px] uppercase bg-green-800 text-white cursor-pointer scale-100' onClick={handleCheckout}>
          Pay with Stripe
        </button>
      </div>
    </div>
  )

  
  return (
    <div className='w-screen fixed right-0 top-0 bg-[rgb(0,0,0,0.5)] z-20 transition-all ease-in duration-300'>
        <div className="h-screen w-[600px] bg-zinc-200 float-right pt-[40px] pr-[10px] relative">
          <button
           type='button'
           className='mt-[35px] flex items-center text-[18px] font-semibold cursor-pointer gap-1 ml-[10px] border-none bg-transparent'
           onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft />
            <span className='ml-[10px]'>Your Cart</span>
            <span className='ml-[10px] text-green-500'>({totalQuantities} items)</span>
           </button>

          { emptyCart }

          <div className="mt-[15px] overflow-auto max-h-70 pt-[20px] pr-[10px]">
            { cartProducts }
          </div>
          { subTotal }
        </div>
    </div>
  )
}

export default Cart