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
  const [orderTotalPrice, updateOrderTotalPrice] = useState(0);
  const [redirect, updateRedirect] = useState(false)
  console.log(cart$.value)

  useEffect(() => {
    let sum = 0;
    for (let price of cart$.value) {
      sum = sum + parseInt(price.value.price)*parseInt(price.value.amount);
    }
    updateOrderTotalPrice(sum)
  }, [])

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
      totalPrice: orderTotalPrice, 
      list: cart$.value 
    } 

  let sendOrder = () => {
    if (!orderName || !orderAdress) {
      updateErrorMess('Du måste fylla i formuläret');
      return;
    } else {
    axios.post(API._ROOT + API._SEND_ORDER + API.TOKEN,
      {data: order})
      .then((response) => {
        console.log(response);
        updateRedirect(true)
      })
    }
  }
  console.log(redirect)

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
        <button onClick={ sendOrder } className="checkout-button">Skicka Order</button>
      </form>
      <p>{ errorMess }</p>
      </main>
    </>
  )
}

export default Checkout;







/*

import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect}from "react-router-dom";
import '../style/style.css';
import {basket$, updateBasket} from '../components/store.js';
import '../style/style.css';

const topHeader = {

  backgroundColor: 'rgb(76, 108, 252)',
  height: '70px',
  width: '100%',
  position: 'fixed',
  top: '0',
  zIndex: '1'

}
const basketContainer = {
  position: 'absolute',
  width: '870px',
  top: '100px',
  left: '50%',
  transform: 'translate(-50%)',
  
}

const Basket = (props) => {
  
  const [redirect, setRedirect] = useState(false)

  let total = 0;
  let sum = 0;
  const emptyBasket = () => {
  
    updateBasket([]);
    props.updateLocal(0)
} 



let obj = basket$.value;
let objPrice = basket$.value
let newObj = {};
let newObj2 = {};

obj.forEach(function(x) {
if (newObj[x.value.product]) {
  newObj[x.value.product] = newObj[x.value.product] + parseInt(x.value.amount);
} else {
  
  newObj[x.value.product] = parseInt(x.value.amount);
}
});



objPrice.forEach(function(x) {
 
    newObj2[x.value.product] = parseInt(x.value.price);
  
  });



let obj2 = [];
let obj3 = []


for (let x in newObj) {

obj2.push({ product: x, amount: newObj[x]});
}

for(let x in newObj2){
  obj3.push({price: newObj2[x]})
}

let finalObj = {}
let finalArr = [];

  for(let i = 0; i < obj2.length; i++){
    finalArr.push(finalObj = {...obj2[i], ...obj3[i]})

  }
  console.log(finalArr)
  const renderBasket = (data, index) => {

    console.log(data)
   
    sum = parseInt(data.price) * parseInt(data.amount)
    
    total = total + sum;


    
    return(
      
      <tbody key={index}>
        <tr>
          <th style={{position: 'relative', textAlign: 'left'}}>{data.product}</th>
        </tr>  
        <tr>
          <td>Antal: {data.amount}</td>
        </tr>
        <tr>
        <td style={{paddingBottom: '20px'}}>Pris styck: {data.price}</td>
          <td>Summa: {sum}</td>
        </tr>
          
  
          
        
        
      </tbody>
    )
  }

  if(redirect){
    return <Redirect to={'/'} />
  }
  if(basket$.value.length === 0){
    setRedirect(true)
  }

  return(
    <>
      <div style={topHeader}></div>
      <div style={basketContainer}>
      
      <h2 style={{position: 'relative'}}>Varukorg</h2>
      <Link to='/basket'><button style={{width: '150px', height: '50px', marginTop: '20px', fontSize: '16px', backgroundColor: 'rgb(76, 108, 252)', marginBottom: '40px', color: 'white', border: 'none', cursor: 'pointer', outline: 'none'}} onClick={emptyBasket}>Töm inköpslista</button></Link>
      <table style={{ fontSize: '16px', paddingLeft: '10px', width: '630px'}}>
      {finalArr.map(renderBasket)}
      </table>
      
      <div style={{position: 'relative', marginTop: '30px', marginLeft: '10px' }}> Summa att betala för varukorgen: <label style={{fontSize: '24px', fontWeight: "bold", left: '180px', position: 'relative'}}>{total} Kr</label></div>
      <Link to={{pathname: '/checkout', state: {finalArr: finalArr}}}><button style={{width: '500px', height: '50px', marginTop: '20px', fontSize: '24px', backgroundColor: 'rgb(76, 108, 252)', color: 'white', border: 'none', cursor: 'pointer', outline: 'none'}} id='handlaKlart'>Gå vidare till betalning</button></Link>
      </div>
      
    </>
  )
}

export default Basket 

*/