import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { toast } from "react-toastify";
import { toastEmitter } from "./Toaster";

const getColor = (expiration) => {
  const today = new Date();
  const expDate = new Date(expiration);

  if (expDate < today) return "red-text";

  var oneWeek = 7;
  var oneWeekFromToday = new Date(today.setDate(today.getDate() + oneWeek));
  if (expDate < oneWeekFromToday) return "blue-text";

  return "";
};

function ItemGroup({
  title,
  getItemGroup,
  itemViewDir,
  canAdd,
  showExpiration,
}) {
  const [matchingItems, setMatchingItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [numItems, setNumItems] = useState(0);
  const [itemStyleIcon, setItemStyleIcon] = useState(
    <FontAwesomeIcon icon={solid("list")} />
  );
  const [unusedIcon, setUnusedIcon] = useState(
    <FontAwesomeIcon icon={solid("image")} />
  );
  const [useImageView, setUseImageView] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.deleted) {
      toast.success("Deleted " + location.state.deleted + "!", toastEmitter);
      location.state.deleted = false;
    }
    if (allItems.length === 0) {
      getItemGroup(setAllItems);
    }
  }, [location.state, allItems, setAllItems, getItemGroup]);

  useEffect(() => {
    setMatchingItems(allItems);
  }, [allItems]);

  useEffect(() => {
    setNumItems(matchingItems.length);
  }, [matchingItems]);

  const getItemsHTML = (items) => {
    if (useImageView) {
      return items.map((item) => (
        <ImgViewItem
          key={item._id}
          item={item}
          itemViewDir={itemViewDir}
          showExpiration={showExpiration}
        />
      ));
    }
    return items.map((item) => (
      <ListViewItem
        key={item._id}
        item={item}
        itemViewDir={itemViewDir}
        showExpiration={showExpiration}
      />
    ));
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

  const getAddButton = () => {
    if (canAdd) {
      return (
        <Link to="/storage/add" className="button-link">
          <button className="obvious small">+</button>
        </Link>
      );
    }
    return <div></div>;
  };

  return (
    <div className="page">
      <div className="main-container other-container food-storage-container">
        <div className="food-storage-header">
          <h1 className="title">{title}</h1>
          <input
            id="item-search-bar"
            className="search-bar"
            type="search"
            placeholder="Search items..."
            onChange={onSearchChange}
          ></input>
          <div className="flex-row">
            {getAddButton()}
            <p>
              {numItems} {numItems > 1 ? "Items" : "Item"}
            </p>
            <button onClick={changeView} className="obvious small">
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

export default ItemGroup;

const ImgViewItem = ({ item, itemViewDir, showExpiration }) => {
  const getImgViewDate = () => {
    return (
      <li className={showExpiration ? getColor(item.expiration) : ""}>
        {showExpiration ? "Expiration" : item.deleted ? "Deleted" : "Added"}
        {": "}
        {showExpiration ? item.expiration : item.added}
      </li>
    );
  };

  const navigate = useNavigate();
  return (
    <div
      className="storage-item"
      onClick={() => {
        navigate(itemViewDir + item._id);
      }}
    >
      <img className="storage-item-picture" src={item.src} alt={item.src} />
      <h3 className={"storage-item-name" + (item.deleted ? " red-text" : "")}>
        {item.name}
      </h3>
      <ul className="storage-item-description">
        <li>Container: {item.container}</li>
        {getImgViewDate()}
      </ul>
    </div>
  );
};

const ListViewItem = ({ item, itemViewDir, showExpiration }) => {
  const navigate = useNavigate();

  const getListViewDate = () => {
    return (
      <div className={showExpiration ? getColor(item.expiration) : ""}>
        <em>{showExpiration ? item.expiration : item.added}</em>
      </div>
    );
  };

  return (
    <div
      className="list-item"
      onClick={() => {
        navigate(itemViewDir + item._id);
      }}
    >
      <ul className="list-item-description">
        <li className={"list-item-name" + (item.deleted ? " red-text" : "")}>
          {item.name}
        </li>
        <li>
          <div className="flex-row">
            <div>
              <em>{item.container}</em>
            </div>
            {getListViewDate()}
          </div>
        </li>
      </ul>
    </div>
  );
};
