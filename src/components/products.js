import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "./api.js"
import Header from "./header.js"
import "../App.css"

function Products () {
  const [ data, updateData ] = useState([]);
  const [ skip, updateSkip ] = useState(0);
  const [ search, updateSearch ] = useState('');
  const [value, updateValue] = useState();

  useEffect(() => {
    const pagination = '&limit=4&skip=' + skip;
    if (search) {
      updateValue('&filter[name][$regex]=' + search)
    } else {
      updateValue('');
    }
    axios.get(API._ROOT + API._PRODUCTS + API.TOKEN + pagination + value) 
      .then((response) => {
        console.log(response.data.entries)
        updateData(response.data.entries)
      })
  }, [skip, search, value]);

  const handleBack = () => {
    updateSkip(skip-4)
    console.log(skip)
  }

  const handleNext = () => {
    updateSkip(skip+4)
    console.log(skip)
  }

  const handleSearch = (e) => {
    updateSearch(e.target.value)
  }

  let renderProducts = (
    data.map( product => {
      return (
        <Link to={ "/product/" + product._id } key={ product._id } className="products-main-link" >
        <div className="products-main-productcontainer">
          { (product.images || []).map(productImg => <img src={ API._ROOT  + productImg.path } alt={ product.name } key={ product._id }></img>).slice(0, 1)}
          <h4>{ product.name } </h4>
          <p>{ product.price + " SEK"}</p>
        </div>
        </Link>
      )
    })
  )
  

  return (
    <>
    <Header />
    <input type="text" name="search" placeholder="Sök artikel"  onChange={ handleSearch } />
    <main>
    { renderProducts }
    </main>
    <button onClick={ handleBack }>Back</button><button onClick={ handleNext }>Next</button>
    <footer></footer>
    </>
  )
  
}

export default Products;