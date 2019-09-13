import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { cart$, updateCart } from '../store.js';
import Header from './header.js';

function Cart () {
  console.log(cart$.value)
  const [render, updateRender] = useState(true);

  let renderCart = (
    cart$.value.map( article => {
      return(
      <div key={ article.value.product } className="cart-main-container">
        <p>{ article.value.product }</p>
        <p>{ article.value.amount + "st" }</p>
        <p>{ article.value.price + " SEK" }</p>
      </div>
      )
    })
  )

  const totalPrice = () => {
    let sum = 0;
    for (let price of cart$.value) {
      sum = sum + parseInt(price.value.price)*parseInt(price.value.amount);
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