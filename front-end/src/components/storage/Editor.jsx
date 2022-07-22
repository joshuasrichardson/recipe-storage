import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServerFacade from "../../api/ServerFacade";
import moment from "moment";

const Editor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [container, setContainer] = useState("");
  const [containers, setContainers] = useState([]);
  const [expiration, setExpiration] = useState("");
  const [tags, setTags] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    const updateContainers = async () => {
      if (containers.length === 0) {
        await ServerFacade.getContainers(setContainers);
      }
    };
    updateContainers();
  }, [containers]);

  useEffect(() => {
    const setItem = async () => {
      if (name === "") {
        const i = await ServerFacade.getItem(id);
        setName(i.name);
        setBrand(i.brand);
        setDescription(i.description);
        setContainer(i.container);
        setExpiration(i.expiration);
        setAmount(i.amount);
        setUnit(i.unit);
        setTags(i.tags);
      }
    };
    setItem();
  }, [id, name]);

  const update = async (e) => {
    e.preventDefault();
    console.log("Exp:", expiration);
    await ServerFacade.updateItem({
      id: id,
      name: name,
      brand: brand,
      description: description,
      container: container,
      expiration: expiration,
      tags: tags,
      amount: amount,
      unit: unit,
    });
    navigate("/storage/" + id, { state: { updated: name } }); // TODO: Fix expiration, remove e.preventDefault(), and restore this
  };

  const getOptions = () => {
    return containers?.map((cont) => <option key={cont} value={cont}></option>);
  };

  return (
    <div className="diff-checker">
      <div className="diff-boxes">
        <div className="storage-item diff-box">
          <h3>Edit Item</h3>
          <form className="item" onSubmit={update}>
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
              onChange={(e) => setContainer(e.target.value)}
            />
            <datalist id="containerList">{getOptions()}</datalist>
            <label className="item">Expiration:</label>
            <input
              type="date"
              name="expiration"
              value={moment(expiration).format("YYYY-MM-DD")}
              onChange={(e) => setExpiration(e.target.value)}
            ></input>
            <button className="obvious addButton" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editor;
