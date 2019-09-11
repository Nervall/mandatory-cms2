import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from './api.js';
import { cart$, updateCart } from '../store.js';
import Header from "./header.js";
import "../App.css";

function Product (props) {
  const [ data, updateData ] = useState([]);
  const [ reviews, updateReviews ] = useState([]);
  const [ productQuantity, updateProductQuantity ] = useState(0);
  const [ commentName, updateCommentName ] = useState('');
  const [ commentText, updateCommentText ] = useState('');
  const [ commentGrade, updateCommentGrade ] = useState(0);
  const id = props.match.params.id;

  useEffect(() => {
  axios.get(API._ROOT + API._PRODUCTS + API.TOKEN + '&filter[_id]=' + id)
    .then((response) => {
      console.log(response.data.entries);
      updateData(response.data.entries);
    })
  }, [id]);

  useEffect(() => {
  axios.get(API._ROOT + API._REVIEW + API.TOKEN + '&filter[productlink._id]=' + id)
  .then((response) => {
    console.log(response.data.entries);
    updateReviews(response.data.entries)
  })
}, [id]);

  let getQuantity = (e) => {
    updateProductQuantity(e.target.value)
  }

  let AddCart = () => {
    let cart = { 
      value : {
          name: data[0].name, 
          price: data[0].price, 
          quantity: productQuantity 
              }
      }
    updateCart([...cart$.value, cart])
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
          <button onClick={ AddCart }>Köp</button><br />
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

  let sendComment = (e) => {

  }

  return (
    <>
    <Header />
    <main>
      { renderProduct }
      { renderReview }
      <div>
      <h4>Skriv en recension</h4>
      <input type="text" name="Namn" placeholder="Namn"></input><br />
      <textarea type="text" name="comment" placeholder="Din kommentar"></textarea><br />
      <input type="range" name="rating" min="0" max="5"></input><br />
      <button onClick={ sendComment }>Skicka recension</button>
      </div>
    </main>
    <footer></footer>
    </>
  )
  
}

export default Product;