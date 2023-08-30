import { Item } from "../../types";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServerFacade from "../../api/ServerFacade";
import SRContainer from "../../sr-ui/SRContainer";
import SRFlex from "../../sr-ui/SRFlex";
import SRHeader from "../../sr-ui/SRHeader";
import { themeGray } from "../../sr-ui/styles";
import ItemForm from "./ItemForm";
import { useTranslation } from "react-i18next";

const Editor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [code, setCode] = useState("");
  const { t } = useTranslation();

  const update = async (item: Item): Promise<void> => {
    await ServerFacade.updateItem(item);
    navigate("/storage/" + id, { state: { updated: item.name } });
  };

  return (
    <SRFlex direction="column">
      <SRContainer maxWidth="medium">
        <SRFlex wrap="wrap" justifyContent="space-around">
          <SRHeader size="large" underlined>
            {t("Edit Item")}
          </SRHeader>
          <SRContainer backgroundColor={themeGray} borderWidth="small">
            <ItemForm
              itemId={id}
              onSubmit={update}
              submitLabel={t("Update")}
              code={code}
              setCode={setCode}
              setImageUrl={() => {}}
              shouldShowQuantityField={false}
            />
          </SRContainer>
        </SRFlex>
      </SRContainer>
    </SRFlex>
  );
};

export default Editor;
