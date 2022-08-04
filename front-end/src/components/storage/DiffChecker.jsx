import { useLocation, useNavigate } from "react-router-dom";
import ServerFacade from "../../api/ServerFacade.ts";

const DiffChecker = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getClass = (attribute) => {
    return JSON.stringify(location.state["old" + attribute]) ===
      JSON.stringify(location.state["new" + attribute])
      ? ""
      : "red-text";
  };

  return (
    <div className="diff-checker">
      <div className="storage-item change-prompt">
        <h3>Change detected</h3>
        <p>Would you like to update the autofill for this item?</p>
      </div>
      <div className="diff-boxes">
        <div className="storage-item diff-box">
          <ul className="storage-item-description">
            <li className={getClass("Code")}>
              Old Code: {location.state.oldCode}
            </li>
            <li className={getClass("Name")}>
              Old Name: {location.state.oldName}
            </li>
            <li className={getClass("Brand")}>
              Old Brand: {location.state.oldBrand}
            </li>
            <li className={getClass("Description")}>
              Old Description: {location.state.oldDescription}
            </li>
            <li className={getClass("Tags")}>
              Old Tags: {location.state.oldTags}
            </li>
            <li className={getClass("Amount")}>
              Old Amount: {location.state.oldAmount}
            </li>
            <li className={getClass("Unit")}>
              Old Unit: {location.state.oldUnit}
            </li>
            <li className={getClass("Container")}>
              Old Container: {location.state.oldContainer}
            </li>
          </ul>
          <button className="obvious" onClick={() => navigate("/storage/add")}>
            Keep
          </button>
        </div>
        <div className="storage-item diff-box">
          <ul className="storage-item-description">
            <li className={getClass("Code")}>
              New Code: {location.state.newCode}
            </li>
            <li className={getClass("Name")}>
              New Name: {location.state.newName}
            </li>
            <li className={getClass("Brand")}>
              New Brand: {location.state.newBrand}
            </li>
            <li className={getClass("Description")}>
              New Description: {location.state.newDescription}
            </li>
            <li className={getClass("Tags")}>
              New Tags: {location.state.newTags}
            </li>
            <li className={getClass("Amount")}>
              New Amount: {location.state.newAmount}
            </li>
            <li className={getClass("Unit")}>
              New Unit: {location.state.newUnit}
            </li>
            <li className={getClass("Container")}>
              New Container: {location.state.newContainer}
            </li>
          </ul>
          <button
            className="obvious"
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
                container: location.state.newContainer,
              });
              navigate("/storage/add");
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiffChecker;
