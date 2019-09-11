import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { cart$, updateCart } from '../store.js';
import Header from './header.js';

function Cart () {
  console.log(cart$.value)
  const [render, updateRender] = useState(true);

  let renderCart = (
    cart$.value.map( article => {
      return(
      <div key={ article.value.name } className="cart-main-container">
        <p>{ article.value.name }</p>
        <p>{ article.value.quantity + "st" }</p>
        <p>{ article.value.price + " SEK" }</p>
      </div>
      )
    })
  )

  const totalPrice = () => {
    let sum = 0;
    for (let price of cart$.value) {
      sum = sum + parseInt(price.value.price)*parseInt(price.value.quantity);
    }
    return sum;
  }

  const emptyCart = () => {
    updateCart([])
    updateRender(false)
  }

  return (
    <>
    <Header />
    <main>
    { renderCart }
    </main>
    <p>Totalt pris: { totalPrice() } SEK</p>
    <Link to="/checkout"><button>Till kassan</button></Link><button onClick={ emptyCart }>Töm varukorgen</button>
    </>
  )
  
}

export default Cart;