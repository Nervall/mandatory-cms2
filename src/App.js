import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Products from "./components/products.js";
import Product from "./components/product.js";
import Checkout from "./components/checkout.js";
import Cart from "./components/cart.js";

function App() {
  return (
    <Router>
      <Route exact path="/" component={ Products } />
      <Route path="/product/:id" component={ Product } />
      <Route path="/cart" component={ Cart } />
      <Route path="/checkout" component={ Checkout } />
    </Router>
  );
}

export default App;
