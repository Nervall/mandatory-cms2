import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { cart$, updateCart } from '../store.js';
import Header from './header.js';

function Cart () {
  console.log(cart$.value)
  const [render, updateRender] = useState(true);

  const getRandomId = () => {
    return Math.floor(Math.random() * 1000000)
  }

  let renderCart = (
    cart$.value.map( article => {
      return(
      <tr key={ getRandomId() }>
        <td>{ article.value.product }</td>
        <td><center>{ article.value.amount + "st" }</center></td>
        <td>{ article.value.price + " kr" }</td>
      </tr>
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

  if (cart$.value.length === 0) {
  return (
    <>
    <Header />
    <main>
    <h2><i className="material-icons shoppingCart in-table">shopping_cart</i> Varukorg</h2>
      <p>Du har inga artiklar i din varukorg</p>
    </main>
    </>
  )
  } else {
    return (
      <>
    <Header />
    <main>
    <h2><i className="material-icons shoppingCart in-table">shopping_cart</i> Varukorg</h2>
    <table>
        <thead>
          <tr>
          <th>Artikel</th>
          <th><center>Kvantitet</center></th>
          <th>SEK</th>
          </tr>
        </thead>
        <tbody>
      { renderCart }
          <tr>
            <td></td>
            <td><center><strong>Totalt:</strong></center></td>
            <td><strong>{ totalPrice() } kr</strong></td>
          </tr>
        </tbody>
      </table>
      <Link to="/checkout"><button className="cart-checkout-button">Till kassan</button></Link><button className="cart-emptyCart-button" onClick={ emptyCart }>Töm varukorgen</button>
    </main>
    
    </>
    )
  }
  
}

export default Cart;