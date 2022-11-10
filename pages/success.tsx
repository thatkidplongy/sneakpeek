import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'
import { AppContextModel } from '../interface/index-page/AppContext'

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext() as AppContextModel

    useEffect(() => {
        localStorage.clear();
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        runFireworks()
    }, [])

    return (
    <div>
        <div className="h-[350px] flex flex-col justify-center items-center">
            <p className="text-green text-[40px]">
                <BsBagCheckFill />
            </p>
            <h2 className='capitalize mt-[15px] font-bold text-[40px] text-sky-900'>Thank you for your order!</h2>
        <p className="text-[16px] font-semibold text-center">
            Check your email inbox for the receipt
        </p>
        <p className="text-[16px] font-semibold text-center m-[10px] mt-[30px]">
            If you have any questions, please email
            <a className='ml-[5px] text-color-600' href="mailto:order@example.com">order@example.com</a>
        </p>
        <Link href='/'>
            <button type='button'  className='max-w-[500px] w-[250px] text-center py-2 rounded-md border-none text-[20px] mt-[30px] uppercase bg-green-800 text-white cursor-pointer scale-100'>
                Continue Shopping
            </button>
        </Link>
        </div>
    </div>
  )
}

export default Success