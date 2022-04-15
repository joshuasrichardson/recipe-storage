import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ServerFacade from "../api/ServerFacade";

const Item = () => {
  let { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(async () => {
    if (item == null) {
      const i = await ServerFacade.getItem(id);
      setItem(i);
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
