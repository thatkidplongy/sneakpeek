import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './'
import { useStateContext } from '../context/StateContext'

import { AppContextModel } from '../interface/index-page/AppContext'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext() as AppContextModel

  const cart = showCart && <Cart />
  return (
    <div className='flex justify-between mt-[6px] mr-[18px] relative'>
      <p className='text-gray-700 text-[18px]'>
        <Link href='/'>Sneakpeek Products</Link>
      </p>

      <button
        type='button'
        className='text-[25px] text-gray-900 cursor-pointer relative ease-in transform border-none bg-transparent hover:scale-110'
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className='top-0 absolute -right-[8px] text-[12px] bg-red-600 text-color-white w-[18px] h-[18px] rounded-md text-center font-bold'>{ totalQuantities }</span>
      </button>

      { cart }
    </div>
  )
}

export default Navbar