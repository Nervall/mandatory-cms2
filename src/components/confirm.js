import React from 'react';
import Header from './header.js';
import { Link } from "react-router-dom";

function Confirm () {
  
 

  return (
    <>
    <Header />
    <main>
    <h2>Tack för din order</h2>
    <p>Dina varor är på väg!</p>
    <Link to="/"><button>Handla mer</button></Link>
    </main>
    </>
  )
  
}

export default Confirm;