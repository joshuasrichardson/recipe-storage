import React, { useState, useEffect, useContext, useCallback } from "react";
import { Context } from "../../App.tsx";
import Scanner from "./BarcodeScanner.jsx";
// // When I decide to bring pictures back in, use this:
// import Uploader from "./Uploader.jsx";
// <Uploader setImage={setImage}></Uploader>
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link, useNavigate } from "react-router-dom";
import ServerFacade from "../../api/ServerFacade.ts";
import { toast } from "react-toastify";
import { toastEmitter } from "../Toaster.tsx";

const AddFoodStorage = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [containers, setContainers] = useState([]);
  const [container, setContainer] = useState("");
  const [expiration, setExpiration] = useState("");
  const [tags, setTags] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useContext(Context);

  const navigate = useNavigate();

  const barcodeLengths = [4, 12, 13];

  const getItem = useCallback(async () => {
    const item = await ServerFacade.getProduct(code);

    if (item == null) return;
    setName(item.name || "");
    setBrand(item.brand || "");
    setDescription(item.description || "");
    setContainer(item.container || "");
    setTags(item.tags || "");
    setAmount(item.amount || "");
    setUnit(item.unit || "");
    setImageUrl(item.src || "");
  }, [code]);

  useEffect(() => {
    if (barcodeLengths.includes(code.length)) {
      // TODO: When the other barcode types are added, make this based on the type
      getItem();
    }
  }, [code, getItem]);

  useEffect(() => {
    const updateContainers = async () => {
      if (containers.length === 0) {
        await ServerFacade.getContainers(setContainers);
      }
    };
    updateContainers();
  }, [containers]);

  const addItem = async (e) => {
    e.preventDefault();

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
      src: imageUrl || undefined,
    });

    await ServerFacade.addFoodStorage(user._id, {
      code: code,
      name: name,
      brand: brand,
      description: description,
      container: container,
      expiration: expiration,
      tags: tags,
      amount: amount,
      unit: unit,
      quantity: quantity,
      src: response.product.src || "",
    });
    if (response.message === "Item already exists with different attributes.") {
      navigate("/item/update", { state: response.state });
    }
    tryAddingContainer();
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
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const getOptions = () => {
    return containers?.map((cont) => <option key={cont} value={cont}></option>);
  };

  const onContainerChange = (e) => {
    setContainer(e.target.value);
  };

  const tryAddingContainer = () => {
    if (
      !containers.includes(container) &&
      container !== "" &&
      container.length < 40
    ) {
      ServerFacade.addContainer(container);
      containers.push(container);
    }
  };

  return (
    <div className="page">
      <div className="main-container other-container">
        <h2>Add Food Storage</h2>
        <div className="flex-row padded">
          <Link to="/storage" className="button-link">
            <button className="small">
              <FontAwesomeIcon icon={solid("warehouse")} />
            </button>
          </Link>
          <Link to="/storage/history" className="button-link">
            <button className="small">
              <FontAwesomeIcon icon={solid("history")} />
            </button>
          </Link>
        </div>
        <div className="video-container">
          <Scanner onDetected={setCode} />
          {name === "" && code !== "" && <p>No results</p>}
          <div className="user-input">
            <img src={imageUrl} alt="" />
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
              <div className="flex-row hundred">
                <div className="forty-five">
                  <label className="item">Amount:</label>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                </div>
                <div className="forty-five">
                  <label className="item">Unit:</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  ></input>
                </div>
              </div>
              <label className="item">Container:</label>
              <input
                list="containerList"
                value={container}
                onChange={onContainerChange}
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
              <button className="obvious addButton" type="submit">
                Add to Storage
              </button>
            </form>
          </div>
        </div>
        <a href="https://Nutritionix.com">Powered by Nutritionix</a>
      </div>
    </div>
  );
};

export default AddFoodStorage;
