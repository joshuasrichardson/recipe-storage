import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Item = () => {
  let { id } = useParams();
  const [item, setItem] = useState(null);
  useEffect(async () => {
    if (item == null) {
      const res = await axios.get("/api/storage/" + id);
      setItem(res.data);
    }
  }, [id, item, setItem]);

  return (
    <div className="storage-item">
      <img className="storage-item-picture" src={item?.src} alt={item?.name} />
      <h3 className="storage-item-name">{item?.name}</h3>
      <ul className="storage-item-description">
        <li>Container: {item?.container}</li>
        <li>Expiration: {item?.expiration}</li>
        <li>Description: {item?.description}</li>
      </ul>
    </div>
  );
};

export default Item;
