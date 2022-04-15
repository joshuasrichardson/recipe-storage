import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServerFacade from "../api/ServerFacade";

function Storage() {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    if (allItems.length === 0) {
      getStorage();
    }
  });

  const getStorage = async () => {
    ServerFacade.getStorage(setAllItems);
  };

  const getItemsHTML = (items) => {
    return items.map((item) => <StorageItem key={item._id} item={item} />);
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

export default Storage;

// <li>Number: {item.count}</li>
const StorageItem = (item) => {
  const navigate = useNavigate();
  item = item.item;
  return (
    <div
      className="storage-item"
      onClick={() => {
        console.log(item);
        navigate("/storage/" + item._id);
      }}
    >
      <img className="storage-item-picture" src={item.src} alt={item.name} />
      <h3 className="storage-item-name">{item.name}</h3>
      <ul className="storage-item-description">
        <li>Container: {item.container}</li>
        <li>Expiration: {item.expiration}</li>
      </ul>
    </div>
  );
};
