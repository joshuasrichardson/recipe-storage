import React, { useState, useContext, useEffect } from "react";
import { Context } from "../App";
import axios from "axios";

function ViewFoodStorage() {
  const { user } = useContext(Context);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    if (allItems.length === 0) {
      getStorage();
    }
  });

  const getStorage = async () => {
    try {
      let response = await axios.get("/api/storage/" + user._id);
      setAllItems(response.data);
    } catch (error) {
      console.log(error.response.data.message);
      setAllItems([]);
    }
  };

  const getItemsHTML = (items) => {
    return items.map((item) => <StorageItem item={item} />);
  };

  return (
    <div className="page">
      <div className="main-container other-container food-storage-container">
        <div className="food-storage-header">
          <h1 className="title">Food Storage</h1>
        </div>
        <div className="storage-item-container">{getItemsHTML(allItems)}</div>
      </div>
    </div>
  );
}

export default ViewFoodStorage;

// <li>Number: {item.count}</li>
const StorageItem = (item) => {
  item = item.item;
  return (
    <div key={item.name} className="storage-item">
      <img className="storage-item-picture" src={item.src} alt={item.name} />
      <h3 className="storage-item-name">{item.name}</h3>
      <ul className="storage-item-description">
        <li>Container: {item.container}</li>
        <li>Expiration: {item.expiration}</li>
      </ul>
    </div>
  );
};
