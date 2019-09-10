import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

function Header (props) {


  return (
    <header>
      <div><Link to="/">Home</Link></div>
    </header>
  )
  
}

export default Header;