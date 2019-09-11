import React from 'react';
import Header from './header.js';
import { Link } from "react-router-dom";

function Confirm () {
  
 

  return (
    <>
    <Header />
    <h3>Tack för din order</h3>
    <p>Dina varor är på väg!</p>
    <Link to="/"><button>Handla mer</button></Link>
    </>
  )
  
}

export default Confirm;