import React from 'react';
import { cart$, updateCart } from '../store.js';
import { Link } from "react-router-dom";
import Header from './header.js';

function Checkout () {
  
  let renderCart = (
    cart$.value.map( article => {
      return(
          <tr>
          <td>{ article.value.name }</td>
          <td>{ article.value.quantity }</td>
          <td>{ article.value.price }</td>
          </tr>
      )
    })
  );

  const totalPrice = () => {
    let sum = 0;
    for (let price of cart$.value) {
      sum = sum + parseInt(price.value.price)*parseInt(price.value.quantity);
    }
    return sum;
  }

  const emptyCart = () => {
    updateCart([])
  }

  return (
    <>
    <Header />
    <h3>Din beställning</h3>
    <table className="checkout-main-container">
        <thead>
          <tr>
          <th>Artikel</th>
          <th>Kvantitet</th>
          <th>SEK</th>
          </tr>
        </thead>
        <tbody>
      { renderCart }
          <tr>
            <td></td>
            <td>Totalt: </td>
            <td>{ totalPrice() }</td>
          </tr>
        </tbody>
      </table>
      <h3>Skickas till</h3>
      <form>
        <input type="text" name="name" placeholder="namn"></input><br />
        <input type="text" name="adress" placeholder="adress"></input><br />
        <Link to="/confirm"><button onClick={ emptyCart() }>Skicka</button></Link>
      </form>
    </>
  )
  
}

export default Checkout;