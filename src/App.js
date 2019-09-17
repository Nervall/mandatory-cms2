import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Products from "./components/products.js";
import Product from "./components/product.js";
import Checkout from "./components/checkout.js";
import Cart from "./components/cart.js";
import Confirm from "./components/confirm.js";

function App() {
  //const [redirect, updateRedirect] = useState(false)
  return (
    <Router>
      <Route exact path="/" component={ Products } />
      <Route path="/product/:id" component={ Product } />
      <Route path="/cart" component={ Cart } />
      <Route path="/checkout" component={ Checkout } />
      <Route path="/confirm" component={ Confirm } />
    </Router>
  );
}

export default App;

//<Route path='/checkout' component={() => <Checkout redirect={redirect} updateRedirect={updateRedirect} />} />