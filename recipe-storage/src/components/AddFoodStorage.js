import React, {useState, useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';
import Scanner from './BarcodeScanner.js';
import {Link} from 'react-router-dom';
import axios from 'axios';

const AddFoodStorage = () => {
  const [camera, setCamera] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setdescription] = useState("");
  const [container, setcontainer] = useState("");
  const [expiration, setExpiration] = useState("");
  const {user} = useContext(GlobalContext);

  const onCodeChange = event => setCode(event.target.value);
  const onNameChange = event => setName(event.target.value);
  const onBrandChange = event => setBrand(event.target.value);
  const onDescriptionChange = event => setdescription(event.target.value);
  const onContainerChange = event => setcontainer(event.target.value);
  const onExpirationChange = event => setExpiration(event.target.value);

  const fetchItems = async () => {
    const data = await fetch("https://nutritionix-api.p.rapidapi.com/v1_1/item?upc=" + code, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
        "x-rapidapi-key": "117f58b37bmshefcfb5c06599164p15d063jsnf2337c5ea376"
      }
    }).catch(() => {
      setName("");
      setBrand("");
      setdescription("");
    });
    const item = await data.json();
    console.log(item);
    if (item.item_name != null) {
      setCamera(!camera);
      setName(item.item_name);
      setBrand(item.brand_name);
      setdescription(item.item_description);
    }
  }

  const onDetected = (code) => {
    setCode(code);
    fetchItems();
  };

  const addToStorage = async (e) => {
    e.preventDefault();
    if (name === "") {
      console.log("Nothing to add");
      return;
    }
    console.log("Adding item:");
    console.log(code);
    console.log(name);
    try {
      let response = await axios.post('http://localhost:3002/storage', {
        user: user._id,
        barcode: code,
        name: name,
        brand: brand,
        description: description,
        container: container,
        expiration: expiration
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (<div className="page">
    <div className="main-container other-container">
      <h2>Add Food Storage</h2>
      <p>Scan the barcode of your item to add it to your inventory.</p>
      <div className="video-container">
        <div className="container">
          {camera && <Scanner onDetected={onDetected}/>}
        </div>
        <button onClick={() => setCamera(!camera)}>
          {
            camera
              ? "Done Scanning"
              : "Start Scanning"
          }
        </button>
        {(name === "" && code !== "") && <p>No results</p>}
        <div className="user-input">
          <form className="item" onSubmit={addToStorage}>
            <label className="item">Barcode Number:</label>
            <input type="text" value={code} onChange={onCodeChange}></input>
            <label className="item">Item Name:</label>
            <input type="text" value={name} onChange={onNameChange}></input>
            <label className="item">Brand Name:</label>
            <input type="text" value={brand} onChange={onBrandChange}></input>
            <label className="item">Item Description:</label>
            <input type="text" value={description} onChange={onDescriptionChange}></input>
            <label className="item">Container:</label>
            <select className="item" default="fridge" onChange={onContainerChange}>
              <option value="fridge">Refrigerator</option>
              <option value="pantry">Pantry</option>
              <option value="shelf">Shelf</option>
              <option value="storage">Storage Room</option>
              <option value="bed">Under the Bed</option>
            </select>
            <label className="item">Expiration:</label>
            <input type="date" name="expiration" value={expiration} onChange={onExpirationChange}></input>
            <button type="submit">Add to Storage</button>
          </form>
        </div>
      </div>
      <div className="div-hr"></div>
      <Link to="/view-items" className="button-link">
        <button>View My Storage</button>
      </Link>
    </div>
  </div>);
}

export default AddFoodStorage;
