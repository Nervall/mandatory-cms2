import React, { useState, useEffect } from 'react';
import { cart$, updateCart } from '../store.js';
import Header from './header.js';

function Cart (props) {
  const [store, updateStore] = useState()
  let buy = cart$;
  console.log(buy._value)
  return (
    <>
    <Header />
    <p>cart</p>
    </>
  )
  
}

export default Cart;