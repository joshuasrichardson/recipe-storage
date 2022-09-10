// @ts-ignore
import { SRDate } from "../../types";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import SRContainer from "../../sr-ui/SRContainer.tsx";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRHeader from "../../sr-ui/SRHeader.tsx";
// @ts-ignore
import { themeGray } from "../../sr-ui/styles.ts";
// @ts-ignore
import ItemForm from "./ItemForm.tsx";

const Editor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [code, setCode] = useState("");

  type UpdateParams = {
    id: string;
    code: number;
    name: string;
    brand: string;
    description: string;
    container: string;
    expiration: SRDate;
    tags: string;
    amount: number;
    unit: string;
  };

  const update = async (item: UpdateParams): Promise<void> => {
    await ServerFacade.updateItem(item);
    navigate("/storage/" + id, { state: { updated: item.name } });
  };

  return (
    <SRFlex direction="column">
      <SRContainer maxWidth="medium">
        <SRFlex wrap="wrap" justifyContent="space-around">
          <SRHeader size="large" underlined>
            Edit Item
          </SRHeader>
          <SRContainer backgroundColor={themeGray} borderWidth="small">
            <ItemForm
              itemId={id}
              onSubmit={update}
              submitLabel="Update"
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
