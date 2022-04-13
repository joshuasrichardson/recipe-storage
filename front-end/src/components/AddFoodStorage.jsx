import React, { useState, useEffect, useContext } from "react";
import { Context } from "../App";
import Scanner from "./BarcodeScanner.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddFoodStorage = () => {
  const [camera, setCamera] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [container, setContainer] = useState("Refrigerator");
  const [expiration, setExpiration] = useState("");
  // const [tags, setTags] = useState([]); // TODO: use this
  // const [quantity, setQuantity] = useState(1); // TODO: use this
  // const [unit, setUnit] = useState(""); // TODO: use this
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const getItem = async () => {
    try {
      let res = await axios.get("/api/products/" + code);
      let item = res.data[0]; // TODO: handle case where the barcode isn't unique
      console.log("Product:", item);
      setName(item.name != null ? item.name : "");
      setBrand(item.brand != null ? item.brand : "");
      setDescription(item.description != null ? item.description : "");
      setContainer(item.container != null ? item.container : "");
      // TODO: Set expiration
    } catch {
      try {
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
        );
        let item = await data.json();
        console.log("Item:", item);
        if (item.item_name != null) {
          // setCamera(!camera);
          setName(item.item_name != null ? item.item_name : "");
          setBrand(item.brand_name != null ? item.brand_name : "");
          setDescription(
            item.item_description != null ? item.item_description : ""
          );
        }
      } catch {
        setName("");
        setBrand("");
        setDescription("");
      }
    }
  };

  useEffect(() => {
    if (code.length === 12) {
      // TODO: When the other barcode types are added, make this based on the type
      getItem();
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

  const onDetected = (code) => {
    setCode(code);
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (name === "") {
      console.log("Nothing to add");
      return;
    }
    console.log("Adding item:", code, name);
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
      addProduct();
      setCode("");
      setName("");
      setBrand("");
      setDescription("");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const addProduct = async () => {
    const response = await axios.post("/api/products", {
      code: code,
      name: name,
      brand: brand,
      description: description,
      container: container,
      expiration: expiration,
    });
    let data = response.data;
    console.log(data);
    if (data.message === "Item already exists with different attributes.") {
      navigate("/item/update", {
        state: {
          id: data.id,
          oldCode: data.code,
          oldName: data.name,
          oldBrand: data.brand,
          oldDescription: data.description,
          newCode: code,
          newName: name,
          newBrand: brand,
          newDescription: description,
        },
      });
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
            <form className="item" onSubmit={addItem}>
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
                default="Refrigerator"
                value={container}
                onChange={onContainerChange}
              >
                <option value="Refrigerator">Refrigerator</option>
                <option value="Pantry">Pantry</option>
                <option value="Shelf">Shelf</option>
                <option value="Storage Room">Storage Room</option>
                <option value="Under the Bed">Under the Bed</option>
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
