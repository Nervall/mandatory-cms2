import React, { useState, useEffect } from 'react';
import { API } from './api.js';
import { Gallery, GalleryImage } from "react-gesture-gallery";
import "../App.css";

function Carousell(props) {
  const [ index, updateIndex ] = useState(0);
  const data = props.data;
  const id = props.paramId

  let arr = []

  let getImages = () => {
    for( let product of data) {
      for (let img of product.images) {
        let obj = { src: API._ROOT + img.path}
        arr.push(obj);
      }
    }
  }

getImages();

 return(
   <div className="product-carousell-container">
     <Gallery
        index={index}
        enableControls={false}
        onRequestChange={i => {
          updateIndex(i);
        }}
      >
        {arr.map(img => (
          <GalleryImage className="product-image" objectFit="contain" key={img.src} src={img.src} />
        ))}
      </Gallery>
   </div>

 )
}



export default Carousell;