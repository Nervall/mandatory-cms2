import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from './api.js';
import { cart$, updateCart } from '../store.js';
import Header from "./header.js";
import "../App.css";

function Product (props) {
  const [ data, updateData ] = useState([])
  const [ reviews, updateReviews ] = useState([])
  //const [ productName, updateProductName ] = useState('')
  //const [ productPrice, updateProductPrice ] = useState(0)
  const [ productQuantity, updateProductQuantity ] = useState(0)
  const [ addToCart, updateAddToCart ] = useState(cart$)
  const id = props.match.params.id;
  //console.log(id)
  //console.log(cart$)

  useEffect(() => {
  axios.get(API._ROOT + API._PRODUCTS + API.TOKEN + '&filter[_id]=' + id)
    .then((response) => {
      console.log(response.data.entries);
      updateData(response.data.entries);
      //updateProductName(response.data.entries[0].name)
      //updateProductPrice(response.data.entries[0].price)
    })
  }, [id]);

  useEffect(() => {
  axios.get(API._ROOT + API._REVIEW + API.TOKEN + '&filter[productlink._id]=' + id)
  .then((response) => {
    console.log(response.data.entries);
    updateReviews(response.data.entries)
  })
}, [id]);

 /*
  useEffect(() => {
    const subscription = cart$.subscribe(updateAddToCart);
    return () => subscription.unsubscribe();
  }, []);

{
  name: '',
  quantity: 0,
  price: 0,
  totalPrice: 0
}
*/
  let getQuantity = (e) => {
    updateProductQuantity(e.target.value)
  }

  let AddCart = (productName, productPrice) => {
    updateAddToCart({ 
       name: productName, 
       price: productPrice, 
       quantity: productQuantity, 
       totalPrice: productPrice 
      });
    updateCart([...cart$, addToCart])
    //updateCart(addToCart);
  }

 

  let renderProduct = (
    data.map( product => {
      return (
        <div key= {id} className="product-main-container">
          <div className="product-left-container">
          <h3>{ product.name } </h3>
          <p>{ product.price + " SEK"} </p>
          <label htmlFor="value">Antal: </label>
          <input type="number" onChange={ getQuantity }id="value" name="value" min="1" max="10" /><br />
          <button onClick={ () => AddCart(product.name, product.price) }>Köp</button><br />
          <p> lager: { product.stock }</p>
          </div>
          <div className="product-right-container">
          <p> { product.description }</p>
          
          { (product.images || []).map(productImg => <img className="product-image" src={ API._ROOT  + productImg.path } alt={ product.name } ></img>)}
          </div>
        </div>
      )
    })
  )

  let renderReview = (
    reviews.map( review => {
      return(
        <div>
          <h3>{ review.titel }</h3>
          <p>{ review.body }</p>
          <p>Betyg: { review.rating }</p>
        </div>
      )
    })
  )

  return (
    <>
    <Header />
    <main>
      { renderProduct }
      { renderReview }
    </main>
    <footer></footer>
    </>
  )
  
}

export default Product;