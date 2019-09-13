import React, { useState, useEffect } from 'react';
import { cart$, updateCart } from '../store.js';
import { Link } from "react-router-dom";
import axios from 'axios';
import { API } from './api.js';
import Header from './header.js';

function Checkout () {
  const [orderName, updateOrderName] = useState('');
  const [orderAdress, updateOrderAdress] = useState('');
  const [orderTotalPrice, updateOrderTotalPrice] = useState(0);
  console.log(cart$.value)

  useEffect(() => {
    let sum = 0;
    for (let price of cart$.value) {
      sum = sum + parseInt(price.value.price)*parseInt(price.value.amount);
    }
    updateOrderTotalPrice(sum)
  }, [])
  
  let renderCart = (
    cart$.value.map( article => {
      return(
          <tr>
          <td>{ article.value.product }</td>
          <td>{ article.value.amount }</td>
          <td>{ article.value.price }</td>
          </tr>
      )
    })
  );

  let getName = (e) => {
    updateOrderName(e.target.value)
  }

  let getAdress = (e) => {
    updateOrderAdress(e.target.value)
  }

  let order = 
    {
      name: orderName, 
      adress: orderAdress, 
      totalPrice: orderTotalPrice, 
      list: cart$.value 
    } 

  let sendOrder = () => {
    axios.post(API._ROOT + API._SEND_ORDER + API.TOKEN,
      {data: order})
  .then((response) => {
    console.log(response);
  })
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
            <td>{ orderTotalPrice }</td>
          </tr>
        </tbody>
      </table>
      <h3>Skickas till</h3>
      <form>
        <input type="text" name="name" placeholder="namn" onChange={ getName }></input><br />
        <input type="text" name="adress" placeholder="adress" onChange={ getAdress }></input><br />
        <Link to="/confirm"><button onClick={ sendOrder }>Skicka</button></Link>
      </form>
    </>
  )
  
}

export default Checkout;