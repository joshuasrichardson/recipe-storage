import kiwi from '../images/kiwi.jpg';
import cookies from '../images/cookies.jpg';
import eggs from '../images/eggs.jpg';
import gyudon from '../images/gyudon.jpg';
import karage_curry from '../images/karage-curry.jpg';
import korokke from '../images/korokke.jpg';
import melon_pan from '../images/melon-pan.jpg';
import nabe from '../images/nabe.jpg';
import peach_pie from '../images/peach-pie.jpg';
import sanshokudon from '../images/sanshokudon.jpg';
import spring_rolls from '../images/spring-rolls.jpg';
import strawberries from '../images/strawberries.jpg';
import tomato from '../images/tomato.jpg';
import React, {useState, useEffect} from 'react';

const items = [
  {
    "src": kiwi,
    "name": "Kiwi",
    "container": "Refrigerator",
    "count": 5,
    "expiration": "February 19, 2022"
  }, {
    "src": cookies,
    "name": "Cookies",
    "container": "Shelf",
    "count": 12,
    "expiration": "February 21, 2022"
  }, {
    "src": eggs,
    "name": "Eggs",
    "container": "Refrigerator",
    "count": 12,
    "expiration": "February 28, 2022"
  }, {
    "src": gyudon,
    "name": "Gyudon",
    "container": "Refrigerator",
    "count": 1,
    "expiration": "February 22, 2022"
  }, {
    "src": karage_curry,
    "name": "Karage Curry",
    "container": "Refrigerator",
    "count": 2,
    "expiration": "February 19, 2022"
  }, {
    "src": korokke,
    "name": "Korokke",
    "container": "Refrigerator",
    "count": 4,
    "expiration": "February 22, 2022"
  }, {
    "src": melon_pan,
    "name": "Melon Bread",
    "container": "Shelf",
    "count": 2,
    "expiration": "February 27, 2022"
  }, {
    "src": nabe,
    "name": "Nabe",
    "container": "Refrigerator",
    "count": 1,
    "expiration": "February 24, 2022"
  }, {
    "src": peach_pie,
    "name": "Peach Pie",
    "container": "Refrigerator",
    "count": 1,
    "expiration": "February 26, 2022"
  }, {
    "src": sanshokudon,
    "name": "Sanshokudon",
    "container": "Refrigerator",
    "count": 1,
    "expiration": "February 12, 2022"
  }, {
    "src": spring_rolls,
    "name": "Spring Rolls",
    "container": "Refrigerator",
    "count": 6,
    "expiration": "February 12, 2022"
  }, {
    "src": strawberries,
    "name": "Strawberries",
    "container": "Refrigerator",
    "count": 8,
    "expiration": "February 22, 2022"
  }, {
    "src": tomato,
    "name": "Tomato",
    "container": "Refrigerator",
    "count": 1,
    "expiration": "February 13, 2022"
  }
];

function ViewFoodStorage() {

  useEffect(() => {
    if (allItems.length === 0) {
      displayItems();
    }
  })

  const [allItems, setAllItems] = useState([]);

  const displayItems = () => {
    setAllItems(getItemsHTML(items));
  };

  const getItemsHTML = (items) => {
    return items.map(item => <StorageItem item={item}/>)
  };

  return (<div className="page">
    <div className="main-container other-container food-storage-container">
      <div className="food-storage-header">
        <h1 className="title">Food Storage</h1>
      </div>
      <div className="storage-item-container">
        {allItems}
      </div>
    </div>

  </div>);
}

export default ViewFoodStorage;

const StorageItem = (item) => {
  item = item.item;
  return (<div key={item.name} className="storage-item">
    <img className="storage-item-picture" src={item.src} alt={item.name}/>
    <h3 className="storage-item-name">{item.name}</h3>
    <ul className="storage-item-description">
      <li>Container: {item.container}</li>
      <li>Number: {item.count}</li>
      <li>Expiration: {item.expiration}</li>
    </ul>
  </div>)
};
