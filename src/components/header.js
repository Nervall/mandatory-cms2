import React from 'react';
import { Link } from 'react-router-dom';
import { cart$ } from '../store.js';
import Logo from '../img/sneakers.png';

import "../App.css";

function Header (props) {

  const totalPrice = () => {
    let sum = 0;
    for (let price of cart$.value) {
      sum = sum + parseInt(price.value.price)*parseInt(price.value.amount);
    }
    return sum;
  }

  const totalAmount = () => {
    let sum = 0;
    for (let amount of cart$.value) {
      sum = sum + parseInt(amount.value.amount);
    }
    return sum;
  }

  return (
    <header>
      <span className="header-logo-container"><Link to="/"><img className="header-logo" src={ Logo } alt="logo" /></Link></span>
      <div className="header-button-digit"><span className="test"><center>{ totalAmount() }</center></span></div>
      <div className="header-cart-container"> <Link to="/cart"><i className="material-icons shoppingCart">shopping_cart</i></Link></div>
      <div className="header-price">{ totalPrice() } kr</div>
    </header>
  )
  
}

export default Header;