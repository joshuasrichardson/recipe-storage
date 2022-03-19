import React, {useState} from 'react';
import Scanner from './BarcodeScanner.js';

const ItemFetcher = () => {

  const fetchItems = async (code) => {
    const data = await fetch("https://nutritionix-api.p.rapidapi.com/v1_1/item?upc=" + code, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
        "x-rapidapi-key": "117f58b37bmshefcfb5c06599164p15d063jsnf2337c5ea376"
      }
    }).catch(() => setResults(null));
    const items = await data.json();
    console.log(items);
    if (items.item_name != null) {
      setCamera(!camera);
      setResults(items);
    }
  }

  const [camera, setCamera] = useState(false);
  const [code, setCode] = useState(null);
  const [results, setResults] = useState(null);

  const onDetected = (code) => {
    console.log(code);
    setCode(code);
    fetchItems(code);
  };

  return (<div className="video-container">
    <div className="container">
      {camera && <Scanner onDetected={onDetected}/>}
    </div>
    <button onClick={() => setCamera(!camera)}>
      {
        camera
          ? "Stop"
          : "Start"
      }
    </button>
    {code != null && <p>{code}</p>}
    {results != null && <p>{results.item_name}</p>}
    {results != null && <p>{results.brand_name}</p>}
    {results != null && <p>{results.nf_protein + "g Protein"}</p>}
    {results == null && <p>No results</p>}
    <a className="link" href="#/">No barcode? Click here to manually add your item.</a>
  </div>);
}

export default ItemFetcher;
