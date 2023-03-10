import React, { useRef, useState, useContext } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutine } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { GlobalContext } from '../context/GlobalContext';
import { urlFor } from '../lib/client';

const Carts = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowcart } =
    useContext(GlobalContext);

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button className='cart-heading' type='button'>
          <AiOutlineLeft />
        </button>
      </div>
    </div>
  );
};

export default Carts;
