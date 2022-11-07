import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  const cart = showCart && <Cart />
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Sneakpeek Products</Link>
      </p>

      <button
        type='button'
        className='cart-icon'
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{ totalQuantities }</span>
      </button>

      { cart }
    </div>
  )
}

export default Navbar