import React from 'react';
import {Link} from 'react-router-dom';
import ItemFetcher from './ItemFetcher.js';
import '../App.css';

const AddFoodStorage = () => {
  return (<div className="page">
    <div className="main-container other-container">
      <h2>Add Food Storage</h2>
      <p>Scan the barcode of your item to add it to your inventory.</p>
      <ItemFetcher/>
      <UserInput/>
      <button>Add</button>
      <div className="div-hr"></div>
      <Link to="/view-items" className="button-link">
        <button>View My Storage</button>
      </Link>
    </div>
  </div>);
}

const UserInput = () => {
  return (<div className="user-input">
    <label className="item">Container:</label>
    <select className="item" default="fridge">
      <option value="fridge">Refrigerator</option>
      <option value="pantry">Pantry</option>
      <option value="shelf">Shelf</option>
      <option value="storage">Storage Room</option>
      <option value="bed">Under Bed</option>
    </select>
    <label className="item">Expiration:</label>
    <form className="item">
      <input type="date" name="expiration"></input>
    </form>
  </div>)
}

export default AddFoodStorage;
