import React, { useState, useEffect, ReactElement } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ServerFacade from "../../api/ServerFacade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { toast } from "react-toastify";
import { toastEmitter } from "../../sr-ui/Toaster";
import SRButton from "../../sr-ui/SRButton";
import SRFlex from "../../sr-ui/SRFlex";
import SRBoxView from "../../sr-ui/SRBoxView";
import { formatDate } from "../../utils/utils";
import { Attribute } from "../../types.js";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  useEffect(() => {
    const updateScreen = async () => {
      if (state?.updated) {
        toast.success(
          t("Updated placeholder", { placeholder: state.updated }),
          toastEmitter({})
        );
        state.updated = false;
      }
      if (!!item) {
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

  const getAttributes = (): Attribute[] => {
    return [
      { key: t("Brand"), value: item?.brand },
      { key: t("Container"), value: item?.container },
      { key: t("Expiration"), value: formatDate(item?.expiration) },
      { key: t("Description"), value: item?.description },
      { key: t("Tags"), value: item?.tags },
      {
        key: t("Amount"),
        value: item?.amount
          ? item.amount + " " + (item.unit ? item.unit : "")
          : "",
      },
      { key: t("Barcode"), value: item?.code },
      { key: t("Added"), value: formatDate(item?.added) },
    ];
  };

  const getOptions = () => {
    if (canEdit) {
      return (
        <SRFlex>
          <SRButton
            size="small"
            onClick={() =>
              navigate("/recipes", {
                state: { name: item.name, tags: item.tags },
              })
            }
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
        titleSize="large"
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
