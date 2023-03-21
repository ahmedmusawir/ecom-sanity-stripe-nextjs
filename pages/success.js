import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { GlobalContext } from '../context/GlobalContext';
import { runFireworks } from '../lib/utils';

const success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useContext(
    GlobalContext
  );

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a href="mailto:order@example.com" className="email">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button
            className="btn"
            type="button"
            width="300px"
            style={{ fontWeight: 'bold', fontSize: '1rem !important' }}
          >
            Continue Shoppting...
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
