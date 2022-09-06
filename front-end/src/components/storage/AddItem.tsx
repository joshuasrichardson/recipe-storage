import React, { useState, useContext, ReactElement } from "react";
// @ts-ignore
import { Context } from "../../App.tsx";
// @ts-ignore
import Scanner from "./BarcodeScanner.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
import { toast } from "react-toastify";
// @ts-ignore
import ItemForm from "./ItemForm.tsx";
// @ts-ignore
import { toastEmitter } from "../../sr-ui/Toaster.tsx";
// @ts-ignore
import SRContainer from "../../sr-ui/SRContainer.tsx";
// @ts-ignore
import SRHeader from "../../sr-ui/SRHeader.tsx";
// @ts-ignore
import SRButtonLink from "../../sr-ui/SRButtonLink.tsx";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRImage from "../../sr-ui/SRImage.tsx";
// @ts-ignore
import { themeGray } from "../../sr-ui/styles.ts";
// @ts-ignore
import { ContextType } from "../../types.ts";

const AddFoodStorage: React.FC = (): ReactElement => {
  const [code, setCode] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useContext<ContextType>(Context);

  const navigate = useNavigate();

  // TODO: add type
  const addItem = async (item) => {
    const response = await ServerFacade.addProduct({
      ...item,
      image: image,
      src: imageUrl || undefined,
    });

    await ServerFacade.addFoodStorage(user._id, {
      ...item,
      src: response.product.src || "",
    });
    if (response.message === "Item already exists with different attributes.") {
      navigate("/item/update", { state: response.state });
    }
    toast.success("Added " + item.name + "!", toastEmitter);
    setImage(null);
    setImageUrl("");
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <SRFlex wrap="wrap" direction="column">
      <SRContainer maxWidth="medium">
        <SRHeader size="large" underlined>
          Add Food Storage
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
          <Scanner onDetected={setCode} />
          <SRFlex direction="column">
            {imageUrl && <SRImage src={imageUrl} />}
            <ItemForm
              code={code}
              setCode={setCode}
              onSubmit={addItem}
              submitLabel="Add to Storage"
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
