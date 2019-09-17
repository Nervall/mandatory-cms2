import React, { useState, useEffect } from 'react';
import { cart$, updateCart } from '../store.js';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { API } from './api.js';
import Header from './header.js';

function Checkout (props) {
  const [orderName, updateOrderName] = useState('');
  const [errorMess, updateErrorMess] = useState('')
  const [orderAdress, updateOrderAdress] = useState('');
  const [redirect, updateRedirect] = useState(false)
  //const [orderTotalPrice, updateOrderTotalPrice] = useState(0);
 
  console.log(cart$.value)
/*
  useEffect(() => {
    let sum = 0;
    for (let price of cart$.value) {
      sum = sum + parseInt(price.value.price)*parseInt(price.value.amount);
    }
    updateOrderTotalPrice(sum)
  }, [])
*/
  const totalPrice = () => {
    let sum = 0;
    for (let price of cart$.value) {
      sum = sum + parseInt(price.value.price)*parseInt(price.value.amount);
    }
    return sum;
  }

  const getRandomId = () => {
    return Math.floor(Math.random() * 1000000)
  }
  
  let renderCart = (
    cart$.value.map( article => {
      return(
          <tr key={ getRandomId() }>
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
      totalPrice: totalPrice(), 
      list: cart$.value 
    } 

/*
if (!orderName || !orderAdress) {
      updateErrorMess('Du måste fylla i formuläret');
      return;
    }
    */

  let sendOrder = () => {
    if (!orderName || !orderAdress) {
      updateErrorMess('Du måste fylla i formuläret');
      return;
    }
    axios.post(API._ROOT + API._SEND_ORDER + API.TOKEN,
      {data: order})
      .then((response) => {
        console.log(response);
      })
      updateRedirect(true)
      updateCart([])
  }


  if (redirect) {
    return (
      <Redirect to="/confirm" />
    )
  } 
  return (
    <>
    <Header />
    <main>
    <h2>Ditt Köp</h2>
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
            <td><strong>{ totalPrice() } kr</strong></td>
          </tr>
        </tbody>
      </table>
      <h3>Skickas till</h3>
      <form>
        <div className="checkout-input-container">
        <input type="text" name="name" placeholder="Namn" onChange={ getName } required></input><br />
        <input type="text" name="adress" placeholder="adress" onChange={ getAdress } required></input><br />
        </div>
        <button onClick={ sendOrder } className="checkout-button">Skicka Order</button>
      </form>
      <p>{ errorMess }</p>
      </main>
    </>
  )
}

export default Checkout;
