import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const DiffChecker = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const updateProduct = async (code, name, brand, description) => {
    const response = await axios.put("/api/products/" + location.state.id, {
      code: code,
      name: name,
      brand: brand,
      description: description,
    });
    console.log(response.data);
  };

  return (
    <div>
      <p>
        The item you inserted seems to have already been added, but some of the
        information is different. Would you like to update it?
      </p>
      <div className="storage-item">
        <ul className="storage-item-description">
          <li>Old Code: {location.state.oldCode}</li>
          <li>Old Name: {location.state.oldName}</li>
          <li>Old Brand: {location.state.oldBrand}</li>
          <li>Old Description: {location.state.oldDescription}</li>
        </ul>
        <button onClick={() => navigate("/storage/add")}>Keep</button>
      </div>
      <div className="storage-item">
        <ul className="storage-item-description">
          <li>New Code: {location.state.newCode}</li>
          <li>New Name: {location.state.newName}</li>
          <li>New Brand: {location.state.newBrand}</li>
          <li>New Description: {location.state.newDescription}</li>
        </ul>
        <button
          onClick={() => {
            updateProduct(
              location.state.newCode,
              location.state.newName,
              location.state.newBrand,
              location.state.newDescription
            );
            navigate("/storage/add");
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default DiffChecker;
