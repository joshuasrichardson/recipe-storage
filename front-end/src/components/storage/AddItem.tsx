import React, { useState, useContext, ReactElement } from "react";
import { Context } from "../../App";
import Scanner from "./BarcodeScanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router-dom";
import ServerFacade from "../../api/ServerFacade";
import { toast } from "react-toastify";
import ItemForm from "./ItemForm";
import { toastEmitter } from "../../sr-ui/Toaster";
import SRContainer from "../../sr-ui/SRContainer";
import SRHeader from "../../sr-ui/SRHeader";
import SRButtonLink from "../../sr-ui/SRButtonLink";
import SRFlex from "../../sr-ui/SRFlex";
import SRImage from "../../sr-ui/SRImage";
import { themeGray } from "../../sr-ui/styles";
import { ContextType, Item } from "../../types";
import { useTranslation } from "react-i18next";

const AddFoodStorage: React.FC = (): ReactElement => {
  const [code, setCode] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useContext<ContextType>(Context);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const addItem = async (item: Item): Promise<void> => {
    const response = await ServerFacade.addProduct({
      ...item,
      image: image,
      src: imageUrl || undefined,
    });

    window.scrollTo({ top: 100, behavior: "smooth" });
    await ServerFacade.addFoodStorage(user._id, {
      ...item,
      src: response.product.src || "",
    });
    if (response.message === "Item already exists with different attributes.") {
      navigate("/item/update", { state: response.state });
    }
    toast.success(
      t("Added placeholder", { placeholder: item.name }),
      toastEmitter({})
    );
    setImage(null);
    setImageUrl("");
  };

  const onCodeDetection = (newBarCode: string): void => {
    if (!newBarCode) return;
    setCode(newBarCode);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  return (
    <SRFlex wrap="wrap" direction="column">
      <SRContainer maxWidth="medium">
        <SRHeader size="large" underlined>
          {t("Add Food Storage")}
        </SRHeader>
        <SRFlex padding="medium">
          <SRButtonLink to="/storage" size="small">
            <FontAwesomeIcon icon={solid("warehouse")} />
          </SRButtonLink>
          <SRButtonLink to="/storage/history" size="small">
            <FontAwesomeIcon icon={solid("history")} />
          </SRButtonLink>
        </SRFlex>
        <SRContainer backgroundColor={themeGray} borderWidth="small">
          <Scanner onDetected={onCodeDetection} />
          <SRFlex direction="column">
            {imageUrl && <SRImage src={imageUrl} label={t("Recipe")} />}
            <ItemForm
              code={code}
              setCode={setCode}
              onSubmit={addItem}
              submitLabel={t("Add to Storage")}
              setImageUrl={setImageUrl}
              shouldShowQuantityField={true}
            ></ItemForm>
          </SRFlex>
        </SRContainer>
        <a style={{ marginBottom: "15px" }} href="https://Nutritionix.com">
          Powered by Nutritionix
        </a>
      </SRContainer>
    </SRFlex>
  );
};

export default AddFoodStorage;
