import React, { useState, useEffect, ReactElement } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { toast } from "react-toastify";
// @ts-ignore
import { toastEmitter } from "../../sr-ui/Toaster.tsx";
// @ts-ignore
import SRButton from "../../sr-ui/SRButton.tsx";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRBoxView from "../../sr-ui/SRBoxView.tsx";

type ItemComponentState = {
  updated: boolean;
};

type ItemComponentProps = {
  canEdit: boolean;
  getItem: Function;
};

const ItemComponent: React.FC<ItemComponentProps> = ({
  canEdit,
  getItem,
}: ItemComponentProps): ReactElement => {
  const location = useLocation();
  const state = location.state as ItemComponentState;
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const updateScreen = async () => {
      if (state?.updated) {
        toast.success("Updated " + state.updated + "!", toastEmitter);
        state.updated = false;
      }
      if (item == null) {
        const i = await getItem(id);
        setItem(i);
      }
    };
    updateScreen();
  }, [state, id, item, setItem, getItem]);

  const deleteItem = () => {
    ServerFacade.deleteItem(id);
    navigate("/storage", { state: { deleted: item.name } });
  };

  const getAttributes = () => {
    return [
      { key: "Brand", value: item?.brand },
      { key: "Container", value: item?.container },
      { key: "Expiration", value: item?.expiration },
      { key: "Description", value: item?.description },
      { key: "Tags", value: item?.tags.length ? item?.tags : "" },
      {
        key: "Amount",
        value: item?.amount ? item?.amount + " " + item?.unit : "",
      },
      { key: "Bar Code", value: item?.code },
      { key: "Added", value: item?.added },
    ];
  };

  const getOptions = () => {
    if (canEdit) {
      return (
        <SRFlex>
          <SRButton
            size="small"
            onClick={() => navigate("/recipes", { state: item })}
          >
            <FontAwesomeIcon icon={solid("search")} />
          </SRButton>
          <SRButton
            size="small"
            onClick={() => navigate("/storage/edit/" + item._id)}
          >
            <FontAwesomeIcon icon={solid("edit")} />
          </SRButton>
          <SRButton size="small" onClick={deleteItem}>
            <FontAwesomeIcon icon={solid("trash")} />
          </SRButton>
        </SRFlex>
      );
    }
  };

  return (
    <SRFlex justifyContent="center" padding="large">
      <SRBoxView
        key={item?._id}
        label={item?.label || item?.name}
        src={item?.src}
        attributes={getAttributes()}
        maxWidth="xlarge"
      >
        {getOptions()}
      </SRBoxView>
    </SRFlex>
  );
};

export default ItemComponent;
