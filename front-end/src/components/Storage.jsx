import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServerFacade from "../api/ServerFacade";

function Storage() {
  const [matchingItems, setMatchingItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [numItems, setNumItems] = useState(0);

  useEffect(() => {
    if (allItems.length === 0) {
      getStorage();
    }
  });

  useEffect(() => {
    setMatchingItems(allItems);
  }, [allItems]);

  useEffect(() => {
    setNumItems(matchingItems.length);
  }, [matchingItems]);

  const getStorage = () => {
    ServerFacade.getStorage(setAllItems);
  };

  const getItemsHTML = (items) => {
    return items.map((item) => <StorageItem key={item._id} item={item} />);
  };

  const onSearchChange = (e) => {
    search(e.target.value);
  };

  const search = (searchField) => {
    if (searchField === "") {
      setMatchingItems(allItems);
      return;
    }

    let searchItems = [];
    for (let item of allItems) {
      if (item.name.toLowerCase().includes(searchField.toLowerCase())) {
        searchItems.push(item);
        continue;
      }
      if (item.brand.toLowerCase().includes(searchField.toLowerCase())) {
        searchItems.push(item);
        continue;
      }
      if (item.container.toLowerCase().includes(searchField.toLowerCase())) {
        searchItems.push(item);
        continue;
      }
      for (let tag of item.tags) {
        if (tag.toLowerCase().includes(searchField.toLowerCase())) {
          searchItems.push(item);
          continue;
        }
      }
    }

    setMatchingItems(searchItems);
  };

  return (
    <div className="page">
      <div className="main-container other-container food-storage-container">
        <div className="food-storage-header">
          <h1 className="title">Food Storage</h1>
          <input
            id="item-search-bar"
            className="search-bar"
            type="search"
            placeholder="Search items..."
            onChange={onSearchChange}
          ></input>
          <p>{numItems} Items</p>
        </div>
        <div className="storage-item-container">
          {getItemsHTML(matchingItems)}
        </div>
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
        navigate("/storage/" + item._id);
      }}
    >
      <img className="storage-item-picture" src={item.src} alt={item.src} />
      <h3 className="storage-item-name">{item.name}</h3>
      <ul className="storage-item-description">
        <li>Container: {item.container}</li>
        <li>Expiration: {item.expiration}</li>
      </ul>
    </div>
  );
};
