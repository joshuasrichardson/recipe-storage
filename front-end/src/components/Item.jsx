import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ServerFacade from "../api/ServerFacade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { toast } from "react-toastify";
import { toastEmitter } from "./Toaster";

const Item = ({ canEdit, getItem }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const updateScreen = async () => {
      if (location.state?.updated) {
        toast.success("Updated " + location.state.updated + "!", toastEmitter);
        location.state.updated = false;
      }
      if (item == null) {
        const i = await getItem(id);
        setItem(i);
      }
    };
    updateScreen();
  }, [location.state, id, item, setItem, getItem]);

  const deleteItem = () => {
    ServerFacade.deleteItem(id);
    navigate("/storage", { state: { deleted: item.name } });
  };

  const getOptions = () => {
    if (canEdit) {
      return (
        <div className="flex-row">
          <button
            className="obvious small"
            onClick={() => navigate("/recipes", { state: item })}
          >
            <FontAwesomeIcon icon={solid("search")} />
          </button>
          <button
            className="obvious small"
            onClick={() => navigate("/storage/edit/" + item._id)}
          >
            <FontAwesomeIcon icon={solid("edit")} />
          </button>
          <button className="obvious small" onClick={deleteItem}>
            <FontAwesomeIcon icon={solid("trash")} />
          </button>
        </div>
      );
    }
  };

  return (
    <div className="storage-item wide-on-computer">
      {item?.src && (
        <img
          className="storage-item-picture"
          src={item?.src}
          alt={item?.name}
        />
      )}
      <h3 className="storage-item-name">{item?.name}</h3>
      <ul className="storage-item-description">
        {item?.brand && <li>Brand: {item?.brand}</li>}
        {item?.container && <li>Container: {item?.container}</li>}
        {item?.expiration && <li>Expiration: {item?.expiration}</li>}
        {item?.description && <li>Description: {item?.description}</li>}
        {item?.tags && <li>Tags: {item?.tags ? item.tags.join(", ") : ""}</li>}
        {item?.amount && <li>Amount: {item?.amount + " " + item?.unit}</li>}
        {item?.added && (
          <li>
            {item?.deleted ? "Deleted" : "Added"}: {item?.added}
          </li>
        )}
      </ul>
      {getOptions()}
    </div>
  );
};

export default Item;
