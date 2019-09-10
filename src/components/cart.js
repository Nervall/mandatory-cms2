import React, { useState, useEffect } from 'react';
import { cart$, updateCart$ } from '../store.js';

function Cart (props) {
  const [store, updateStore] = useState(cart$)
  console.log(store.value[0])
  console.log(props)
  return (
    <p>cart</p>
  )
  
}

export default Cart;