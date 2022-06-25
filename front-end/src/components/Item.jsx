import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServerFacade from "../api/ServerFacade";

const Item = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(async () => {
    if (item == null) {
      const i = await ServerFacade.getItem(id);
      setItem(i);
    }
  }, [id, item, setItem]);

  const deleteItem = () => {
    ServerFacade.deleteItem(id);
    navigate("/storage");
  };

  return (
    <div className="storage-item wide-on-computer">
      <img className="storage-item-picture" src={item?.src} alt={item?.name} />
      <h3 className="storage-item-name">{item?.name}</h3>
      <ul className="storage-item-description">
        <li>Container: {item?.container}</li>
        <li>Expiration: {item?.expiration}</li>
        <li>Description: {item?.description}</li>
        <li>Tags: {item?.tags ? item.tags.join(", ") : ""}</li>
        <li>Amount: {item?.amount + " " + item?.unit}</li>
      </ul>
      <button onClick={() => navigate("/recipes", { state: item })}>
        &#128269;
      </button>
      <button onClick={() => navigate("/storage/edit/" + item._id)}>
        Edit
      </button>
      <button onClick={deleteItem}>&#x1F5D1;</button>
    </div>
  );
};

export default Item;
