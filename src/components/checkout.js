import React, { useState, useEffect } from 'react';
import { cart$, updateCart } from '../store.js';
import { Link } from "react-router-dom";
import axios from 'axios';
import { API } from './api.js';
import Header from './header.js';

function Checkout () {
  const [orderName, updateOrderName] = useState('');
  const [errorMess, updateErrorMess] = useState('')
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
          <td><center>{ article.value.amount }</center></td>
          <td>{ article.value.price } kr</td>
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
    if (!orderName || !orderAdress) {
      updateErrorMess('Du måste fylla i formuläret');
      return;
    } else if (cart$.value === []) {
      updateErrorMess('Det finna inga varor i varukorgen')
      return;
    } else {
    axios.post(API._ROOT + API._SEND_ORDER + API.TOKEN,
      {data: order})
      .then((response) => {
        console.log(response);
        updateCart([])
      })
    }
  }

  return (
    <>
    <Header />
    <main>
    <h3>Din beställning</h3>
    <table className="checkout-main-container">
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
            <td><strong>{ orderTotalPrice } kr</strong></td>
          </tr>
        </tbody>
      </table>
      <h3>Skickas till</h3>
      <form>
        <div className="checkout-input-container">
        <input type="text" name="name" placeholder="Namn" onChange={ getName } required></input><br />
        <input type="text" name="adress" placeholder="adress" onChange={ getAdress } required></input><br />
        </div>
        <button onClick={ sendOrder } className="checkout-button">Skicka Order<Link to="/confirm"> </Link></button>
      </form>
      <p>{ errorMess }</p>
      </main>

    </>
  )
  
}

export default Checkout;