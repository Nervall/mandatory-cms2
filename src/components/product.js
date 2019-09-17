import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from './api.js';
import { cart$, updateCart } from '../store.js';
import Header from "./header.js";
import Footer from "./footer.js";
import Rater from 'react-rater';
import "../App.css";
//const ReactMarkdown = require('react-markdown');

function Product (props) {
  const [ data, updateData ] = useState([]);
  const [ reviewMess, updateReviewMess ] = useState('');
  const [ render, updateRender ] = useState(false);
  const [ reviews, updateReviews ] = useState([]);
  const [ productQuantity, updateProductQuantity ] = useState(1);
  const [ commentName, updateCommentName ] = useState('');
  const [ commentText, updateCommentText ] = useState('');
  const [ commentGrade, updateCommentGrade ] = useState(0);
  const [ errorMess, updateErrorMess ] = useState('');
  const [ cartMess, updateCartMess ] = useState('');
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

  const getRandomId = () => {
    return Math.floor(Math.random() * 1000000)
  }

  let getQuantity = (e) => {
    updateProductQuantity(e.target.value)
  }

  let AddCart = () => {
    if (!productQuantity) {
      return null;
    } else {
    let cart = { 
      value : {
          product: data[0].name, 
          amount: productQuantity,
          price: data[0].price, 
              }
      }
    updateCart([...cart$.value, cart])
    updateProductQuantity(0);
    updateCartMess('Tillagd i varukorg')
  }
}

  let sendComment = () => {
    if (!commentName || !commentText|| !commentGrade) {
      updateErrorMess('Du måste fylla i hela formuläret')
      return null;
    } else {
    axios.post(API._ROOT + API._SEND_REVIEW + API.TOKEN,
      {data: {
        titel: commentName, 
        body: commentText, 
        rating: commentGrade, 
        productlink: { _id: id } 
      } 
    })
  .then((response) => {
    console.log(response);
    updateErrorMess('')
    updateReviewMess("Skickat")
    setTimeout(() => {
      updateReviewMess('')
    }, 2000); 
    updateRender(true)
  })
  }
  }

  let commentNameValue = (e) => {
    updateCommentName(e.target.value)
  }

  let commentTextValue = (e) => {
    updateCommentText(e.target.value)
  }

  let commentRatingValue = (e) => {
    updateCommentGrade(e.target.value)
  }

  let renderProduct = (
    data.map( product => {
      return (
        <div key= {getRandomId() } className="product-name-container">
          <h2>{ product.name } </h2>
          <h3>{ product.price + " SEK"} </h3>
          <p className="product-instock"> { product.stock } st i lager</p>
          <label htmlFor="value"></label>
          <input type="number" 
              onChange={ getQuantity } 
              id="value" 
              value={ productQuantity } 
              name="value" 
              min="1" 
              max="10" 
              required />
          <button className="product-cart-button" onClick={ AddCart }>Lägg i varukorg</button><span className="product-cart-mess">{ cartMess }</span>
          <div>
          <h4>Beskrivning av produkten</h4>
          <p className="product-description"> { product.description } </p>
          </div>
        </div>
      )
    })
  )

  let renderGallery = (
    data.map( product => {
      return(
        <div key={ getRandomId() } className="product-image-container">
          { (product.images || []).map(productImg => <img 
              key={ getRandomId() }
              className="product-image" 
              src={ API._ROOT  + productImg.path } alt={ productImg.path } ></img>)}
        </div>
      )
    })
  )

  let renderReview = (
    reviews.map( review => {
      return(
        <div key={ getRandomId() } className="product-review-container">
          <Rater className="product-review-rater" total={Number(review.rating)} interactive={false}></Rater>
          <p><strong>{ review.titel }</strong></p>
          <p>{ review.body }</p> 
        </div>
      )
    })
  )
   
  return (
    <>
    <Header />
      <main className="product-container">
      { renderGallery }
      <div className="product-content-container">
      { renderProduct }
      <h4 className="product-review-heading">Recensioner</h4>
      { renderReview }
      <div className="product-writereview-container">
      <h4 >Skriv en recension</h4>
      <input type="text" name="Namn" placeholder="Rubrik" onChange={commentNameValue} required></input><br />
      <textarea type="text" name="comment" placeholder="Din kommentar" onChange={commentTextValue} required></textarea><br />
      <p>Betyg</p>
      <div className="range-container">
      <input type="range" className="range-slider" name="rating" min="0" max="5" step="1" onChange={commentRatingValue} required></input><br />
      </div>
      <button className="product-button-review" onClick={ sendComment }>Skicka recension</button>
      <div>{ reviewMess }</div>
      <p>{ errorMess }</p>
      </div>
      </div>
      </main>
    <Footer />
    </>
  )
  
}

export default Product;