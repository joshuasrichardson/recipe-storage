import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ServerFacade from "../api/ServerFacade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function Storage() {
  const [matchingItems, setMatchingItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [numItems, setNumItems] = useState(0);
  const [itemStyleIcon, setItemStyleIcon] = useState(
    <FontAwesomeIcon icon={solid("list")} />
  );
  const [unusedIcon, setUnusedIcon] = useState(
    <FontAwesomeIcon icon={solid("image")} />
  );
  const [useImageView, setUseImageView] = useState(true);

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
    if (useImageView) {
      return items.map((item) => <ImgViewItem key={item._id} item={item} />);
    }
    return items.map((item) => <ListViewItem key={item._id} item={item} />);
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
          break;
        }
      }
    }

    setMatchingItems(searchItems);
  };

  const changeView = () => {
    let temp = itemStyleIcon;
    setItemStyleIcon(unusedIcon);
    setUnusedIcon(temp);

    setUseImageView(!useImageView);
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
          <div className="flex-row">
            <Link to="/storage/add" className="button-link">
              <button className="small">+</button>
            </Link>
            <p>{numItems} Items</p>
            <button onClick={changeView} className="small">
              {itemStyleIcon}
            </button>
          </div>
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
const ImgViewItem = (item) => {
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

const ListViewItem = (item) => {
  const navigate = useNavigate();
  item = item.item;
  return (
    <div
      className="list-item"
      onClick={() => {
        navigate("/storage/" + item._id);
      }}
    >
      <ul className="list-item-description">
        <li className="list-item-name">{item.name}</li>
        <li>
          <div className="flex-row">
            <div>
              <em>{item.container}</em>
            </div>
            <div>
              <em>{item.expiration}</em>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
