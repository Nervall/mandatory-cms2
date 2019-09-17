import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "./api.js";
import Header from "./header.js";
import Footer from "./footer.js";
import "../App.css"

function Products () {
  const [ data, updateData ] = useState([]);
  const [ skip, updateSkip ] = useState(0);
  const [ search, updateSearch ] = useState('');
  const [ value, updateValue ] = useState();
  const [ totalPost, updateTotalPost ] = useState(0);
  const [ disableBack, updateDisableBack ] = useState(true);
  const [ disableNext, updateDisableNext ] = useState(false);
  const [ isChecked, updateIsChecked ] = useState(false);
  const [ isInStock, updateIsInStock ] = useState()

  useEffect(() => {
    const pagination = '&limit=10&skip=' + skip;
    if (isChecked){
       updateIsInStock('&filter[stock]=true')
    } 
    if (search) {
      updateValue('&filter[name][$regex]=' + search)
    } 
    else {
      updateValue('');
    }
    axios.get(API._ROOT + API._PRODUCTS + API.TOKEN + pagination + isInStock + value) 
      .then((response) => {
        console.log(response.data.entries)
        updateTotalPost(response.data.total)
        updateData(response.data.entries)
      })
  }, [skip, search, value, isChecked, isInStock]);

  useEffect( () => {
    if (skip === 0) {
      updateDisableBack(true);
      updateDisableNext(false)
    }
    else if (skip > totalPost-10) {
      updateDisableNext(true);
      updateDisableBack(false)
    }
    else {
      updateDisableBack(false)
      updateDisableNext(false)
    }
  },[skip, totalPost]
  );

  const handleBack = () => {
    updateSkip(skip-10)
  }

  const handleNext = () => {
    updateSkip(skip+10)
  }

  const handleSearch = (e) => {
    updateSearch(e.target.value)
  }

  const inStock = (e) => {
    updateIsChecked(e.target.checked)
  }

  let renderProducts = (
    data.map( product => {
      return (
        <Link to={ "/product/" + product._id } key={ product._id } className="products-main-link" >
        <div className="products-main-productcontainer">
          <center>
          { (product.images || []).map(productImg => <img 
              src={ API._ROOT  + productImg.path } 
              className="products-main-img"
              alt={ product.name } key={ product._id }></img>).slice(0, 1)}
              </center>
          <h4>{ product.name } </h4>
          <p>{ product.price + " SEK"}</p>
        </div>
        </Link>
      )
    })
  )
  
  if (data === null) {
    return (<p>Loading...</p>)
  }
  return (
    <>
    <Header />
    <div className="products-search-container">
    <input type="search" className="products-input-search" name="search" placeholder="Sök artikel" onChange={ handleSearch } />
    <span className="products-checkbox-container">
    <label htmlFor="stock"> Finns i lager</label>
    <input type="checkbox" checked={ isChecked } onChange={ inStock } name="stock" />
    </span>
    </div>
    <main className="products-main-container">
    { renderProducts }
    </main>
    <div className="products-button-container">
      <button className="products-button"  disabled={ disableBack } onClick={ handleBack }><i className="material-icons">chevron_left</i></button>
      <button className="products-button" disabled={ disableNext } onClick={ handleNext }><i className="material-icons">chevron_right</i></button></div>
    <Footer />
    </>
  )
  
}

export default Products;