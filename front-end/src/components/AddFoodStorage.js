import React, { useState, useEffect, useContext } from "react";
import { Context } from "../App";
import Scanner from "./BarcodeScanner.js";
import { Link } from "react-router-dom";
import axios from "axios";

const AddFoodStorage = () => {
  const [camera, setCamera] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [container, setContainer] = useState("");
  const [expiration, setExpiration] = useState("");
  const { user } = useContext(Context);

  useEffect(() => {
    if (code.length > 6) {
      fetchItems();
    }
  }, [code]);

  const onCodeChange = async (event) => {
    setCode(event.target.value);
  };
  const onNameChange = (event) => setName(event.target.value);
  const onBrandChange = (event) => setBrand(event.target.value);
  const onDescriptionChange = (event) => setDescription(event.target.value);
  const onContainerChange = (event) => setContainer(event.target.value);
  const onExpirationChange = (event) => setExpiration(event.target.value);

  const fetchItems = async () => {
    const data = await fetch(
      "https://nutritionix-api.p.rapidapi.com/v1_1/item?upc=" + code,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
          "x-rapidapi-key":
            "117f58b37bmshefcfb5c06599164p15d063jsnf2337c5ea376",
        },
      }
    ).catch(() => {
      setName("");
      setBrand("");
      setDescription("");
    });
    let item = await data.json();
    console.log(item);
    if (item.item_name != null) {
      // setCamera(!camera);
      setName(item.item_name != null ? item.item_name : "");
      setBrand(item.brand_name != null ? item.brand_name : "");
      setDescription(
        item.item_description != null ? item.item_description : ""
      );
    } else if (item.status_code == 404) {
      let res = await axios.get("/api/products/" + code);
      item = res.data[0];
      console.log("My product", item);
      setName(item.name != null ? item.name : "");
      setBrand(item.brand != null ? item.brand : "");
      setDescription(item.description != null ? item.description : "");
      setContainer(item.container != null ? item.container : "");
      // TODO: Set expiration
    }
  };

  const onDetected = (code) => {
    setCode(code);
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
      let response = await axios.post("/api/storage", {
        user: user._id,
        barcode: code,
        name: name,
        brand: brand,
        description: description,
        container: container,
        expiration: expiration,
      });
      console.log(response.data);
      setCode("");
      setName("");
      setBrand("");
      setDescription("");
      response = await axios.post("/api/products", {
        code: code,
        name: name,
        brand: brand,
        description: description,
        container: container,
        expiration: expiration,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="page">
      <div className="main-container other-container">
        <h2>Add Food Storage</h2>
        <p>Scan the barcode of your item to add it to your inventory.</p>
        <div className="video-container">
          <div className="container">
            {camera && <Scanner onDetected={onDetected} />}
          </div>
          <button onClick={() => setCamera(!camera)}>
            {camera ? "Done Scanning" : "Start Scanning"}
          </button>
          {name === "" && code !== "" && <p>No results</p>}
          <div className="user-input">
            <form className="item" onSubmit={addToStorage}>
              <label className="item">Barcode Number:</label>
              <input type="text" value={code} onChange={onCodeChange}></input>
              <label className="item">Item Name:</label>
              <input type="text" value={name} onChange={onNameChange}></input>
              <label className="item">Brand Name:</label>
              <input type="text" value={brand} onChange={onBrandChange}></input>
              <label className="item">Item Description:</label>
              <input
                type="text"
                value={description}
                onChange={onDescriptionChange}
              ></input>
              <label className="item">Container:</label>
              <select
                className="item"
                default="fridge"
                value={container}
                onChange={onContainerChange}
              >
                <option value="fridge">Refrigerator</option>
                <option value="pantry">Pantry</option>
                <option value="shelf">Shelf</option>
                <option value="storage">Storage Room</option>
                <option value="bed">Under the Bed</option>
              </select>
              <label className="item">Expiration:</label>
              <input
                type="date"
                name="expiration"
                value={expiration}
                onChange={onExpirationChange}
              ></input>
              <button className="addButton" type="submit">
                Add to Storage
              </button>
            </form>
          </div>
        </div>
        <div className="div-hr"></div>
        <Link to="/view-items" className="button-link">
          <button>View My Storage</button>
        </Link>
      </div>
    </div>
  );
};

export default AddFoodStorage;
