import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

function Header (props) {


  return (
    <header>
      <div><Link to="/">Home</Link></div>
      <div><Link to="/cart"><i className="material-icons shoppingCart">shopping_cart</i></Link></div>
    </header>
  )
  
}

export default Header;