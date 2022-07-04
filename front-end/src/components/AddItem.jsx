import React, { useState, useEffect, useContext } from "react";
import { Context } from "../App";
import Scanner from "./BarcodeScanner.jsx";
import Uploader from "./Uploader.jsx";
import { Link, useNavigate } from "react-router-dom";
import ServerFacade from "../api/ServerFacade";
import { toast } from "react-toastify";
import { toastEmitter } from "./Toaster";

const AddFoodStorage = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [containers, setContainers] = useState([]);
  const [container, setContainer] = useState("");
  const [expiration, setExpiration] = useState("");
  const [tags, setTags] = useState([]);
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const getItem = async () => {
    const item = await ServerFacade.getProduct(code);
    if (item == null) return;
    setName(item.name ? item.name : "");
    setBrand(item.brand ? item.brand : "");
    setDescription(item.description ? item.description : "");
    setContainer(item.container ? item.container : "Refrigerator");
    setTags(item.tags ? item.tags.join(", ") : "");
    setAmount(item.amount ? item.amount : "");
    setUnit(item.unit ? item.unit : "");
    setImageUrl(item.src ? item.src : "");
    console.log("Image url: ", item.src);
    // TODO: Set expiration and new attributes
  };

  useEffect(() => {
    if (code.length === 12) {
      // TODO: When the other barcode types are added, make this based on the type
      getItem();
    }
  }, [code]);

  useEffect(async () => {
    if (containers && containers.length > 0) {
      setContainer(containers[0]);
    } else {
      await ServerFacade.getContainers(setContainers);
      if (!containers || containers.length === 0) {
        setContainer("Refrigerator");
      } else {
        setContainer(containers[0]);
      }
    }
  }, [containers]);

  const addItem = async (e) => {
    e.preventDefault();

    console.log("add item: ", {
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
      tags: tags.split(",").map((t) => t.trim()),
      amount: amount,
      unit: unit,
      image: image,
    });
    console.log("src:", response.src);
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
      src: response.src ? response.src : "",
    });
    if (response.message === "Item already exists with different attributes.") {
      navigate("/item/update", { state: response.state });
    }
    toast.success("Added " + name + "!", toastEmitter);
    setCode("");
    setName("");
    setBrand("");
    setDescription("");
    setTags("");
    setAmount("");
    setUnit("");
    setQuantity(1);
    setImage(null);
    setImageUrl("");
  };

  const getOptions = () => {
    return containers?.map((cont) => <option key={cont} value={cont}></option>);
  };

  const onContainerChange = (e) => {
    setContainer(e.target.value);
  };

  const onContainerBlur = (e) => {
    const cont = e.target.value;
    if (!containers.includes(cont) && cont !== "" && cont.length < 40) {
      ServerFacade.addContainer(cont);
      containers.push(cont);
    }
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
              <label className="item">Container:</label>
              <input
                list="containerList"
                value={container}
                onChange={onContainerChange}
                onBlur={onContainerBlur}
              />
              <datalist id="containerList">{getOptions()}</datalist>
              <label className="item">Expiration:</label>
              <input
                type="date"
                name="expiration"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
              ></input>
              <label className="item">Quantity:</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></input>
              <Uploader setImage={setImage}></Uploader>
              <button className="obvious addButton" type="submit">
                Add to Storage
              </button>
            </form>
          </div>
        </div>
        <div className="div-hr"></div>
        <Link to="/storage" className="button-link">
          <button className="obvious">View My Storage</button>
        </Link>
      </div>
    </div>
  );
};

export default AddFoodStorage;
