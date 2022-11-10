import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='text-sky-900 text-xl  mb-4 text-cemter mt-[20px] pt-[30px] pr-[10px] flex flex-col items-center gap-[10px] justify-center'>
      <p>2022 SneakPeek All rights reserved</p>
      <p className='text-3xl flex gap-[10px]'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer