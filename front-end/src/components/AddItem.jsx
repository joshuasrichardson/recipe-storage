import React, { useState, useEffect, useContext } from "react";
import { Context } from "../App";
import Scanner from "./BarcodeScanner.jsx";
import Uploader from "./Uploader.jsx";
import { Link, useNavigate } from "react-router-dom";
import ServerFacade from "../api/ServerFacade";

const AddFoodStorage = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [container, setContainer] = useState("Refrigerator");
  const [expiration, setExpiration] = useState("");
  const [tags, setTags] = useState([]);
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const getItem = async () => {
    const item = await ServerFacade.getProduct(code);
    if (item == null) return;
    setName(item.name != null ? item.name : "");
    setBrand(item.brand != null ? item.brand : "");
    setDescription(item.description != null ? item.description : "");
    setContainer(item.container != null ? item.container : "Refrigerator");
    setTags(item.tags != null ? item.tags.join(", ") : "");
    setAmount(item.amount != null ? item.amount : "");
    setUnit(item.unit != null ? item.unit : "");
    setImageUrl(item.src != null ? item.src : "");
    // TODO: Set expiration and new attributes
  };

  useEffect(() => {
    if (code.length === 12) {
      // TODO: When the other barcode types are added, make this based on the type
      getItem();
    }
  }, [code]);

  const addItem = async (e) => {
    e.preventDefault();
    await ServerFacade.addFoodStorage(user._id, {
      code: code,
      name: name,
      brand: brand,
      description: description,
      container: container,
      expiration: expiration,
      tags: tags.split(",").map((t) => t.trim()),
      amount: amount,
      unit: unit,
      quantity: quantity,
      image: image,
    });
    const response = await ServerFacade.addProduct({
      code: code,
      name: name,
      brand: brand,
      description: description,
      container: container,
      expiration: expiration,
      tags: tags,
      amount: amount,
      unit: unit,
      image: image,
    });
    if (response.message === "Item already exists with different attributes.") {
      navigate("/item/update", { state: response.state });
    }
    setCode("");
    setName("");
    setBrand("");
    setDescription("");
    setTags("");
    setAmount("");
    setUnit("");
    setQuantity(1);
  };

  return (
    <div className="page">
      <div className="main-container other-container">
        <h2>Add Food Storage</h2>
        <p>Scan the barcode of your item to add it to your inventory.</p>
        <div className="video-container">
          <Scanner onDetected={setCode} />
          {name === "" && code !== "" && <p>No results</p>}
          <div className="user-input">
            <img src={imageUrl} />
            <form className="item" onSubmit={addItem}>
              <label className="item">Barcode Number:</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></input>
              <label className="item">Item Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <label className="item">Brand Name:</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
              <label className="item">Item Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
              <label className="item">Tags:</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              ></input>
              <label className="item">Amount:</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              ></input>
              <label className="item">Unit:</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              ></input>
              <label className="item">Quantity:</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></input>
              <label className="item">Container:</label>
              <select
                className="item"
                default="Refrigerator"
                value={container}
                onChange={(e) => setContainer(e.target.value)}
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
                onChange={(e) => setExpiration(e.target.value)}
              ></input>
              <Uploader setImage={setImage}></Uploader>
              <button className="addButton" type="submit">
                Add to Storage
              </button>
            </form>
          </div>
        </div>
        <div className="div-hr"></div>
        <Link to="/storage" className="button-link">
          <button>View My Storage</button>
        </Link>
      </div>
    </div>
  );
};

export default AddFoodStorage;
