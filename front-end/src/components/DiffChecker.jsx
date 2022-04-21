import { useLocation, useNavigate } from "react-router-dom";
import ServerFacade from "../api/ServerFacade";

const DiffChecker = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
          <li>Old Tags: {location.state.oldTags}</li>
          <li>Old Amount: {location.state.oldAmount}</li>
          <li>Old Unit: {location.state.oldUnit}</li>
        </ul>
        <button onClick={() => navigate("/storage/add")}>Keep</button>
      </div>
      <div className="storage-item">
        <ul className="storage-item-description">
          <li>New Code: {location.state.newCode}</li>
          <li>New Name: {location.state.newName}</li>
          <li>New Brand: {location.state.newBrand}</li>
          <li>New Description: {location.state.newDescription}</li>
          <li>New Tags: {location.state.newTags}</li>
          <li>New Amount: {location.state.newAmount}</li>
          <li>New Unit: {location.state.newUnit}</li>
        </ul>
        <button
          onClick={() => {
            ServerFacade.updateProduct({
              id: location.state.id,
              code: location.state.newCode,
              name: location.state.newName,
              brand: location.state.newBrand,
              description: location.state.newDescription,
              tags: location.state.newTags,
              amount: location.state.newAmount,
              unit: location.state.newUnit,
            });
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
