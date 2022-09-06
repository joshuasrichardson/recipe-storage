import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEventHandler,
  ReactElement,
} from "react";
// @ts-ignore
import SRButton from "../../sr-ui/SRButton.tsx";
// @ts-ignore
import SRTextInput from "../../sr-ui/SRTextInput.tsx";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRFlexItem from "../../sr-ui/SRFlexItem.tsx";
// @ts-ignore
import SRDropDown from "../../sr-ui/SRDropDown.tsx";
// @ts-ignore
import SRDateInput from "../../sr-ui/SRDateInput.tsx";
// @ts-ignore
import SRForm from "../../sr-ui/SRForm.tsx";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";

type ItemFormProps = {
  code: string;
  setCode: (code: string) => void;
  itemId?: string;
  submitLabel: string;
  onSubmit: (item: any) => void; // TODO: Add type
  setImageUrl: (url: string) => void; // TODO: Add type
  shouldShowQuantityField?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const ItemForm: React.FC<ItemFormProps> = (
  props: ItemFormProps
): ReactElement => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [containers, setContainers] = useState([]);
  const [container, setContainer] = useState("");
  const [expiration, setExpiration] = useState("");
  const [tags, setTags] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(1);

  const autofillWithProductInfo = useCallback(async () => {
    const item = await ServerFacade.getProduct(props.code);

    if (item == null) return;
    props.setCode(item.code);
    setName(item.name || "");
    setBrand(item.brand || "");
    setDescription(item.description || "");
    setContainer(item.container || "");
    setTags(item.tags || "");
    setAmount(item.amount || "");
    setUnit(item.unit || "");
    props.setImageUrl(item.src || "");
  }, [props.code]);

  useEffect(() => {
    const setItem = async () => {
      if (name === "") {
        const i = await ServerFacade.getItem(props.itemId);
        console.log("Item:", i);
        props.setCode(i.code);
        setName(i.name);
        setBrand(i.brand);
        setDescription(i.description);
        setContainer(i.container);
        setExpiration(i.expiration);
        setAmount(i.amount);
        setUnit(i.unit);
        setTags(i.tags);
      }
    };
    if (props.itemId) setItem();
  }, [props.itemId, name]);

  useEffect(() => {
    const updateContainers = async () => {
      if (containers.length === 0) {
        await ServerFacade.getContainers(setContainers);
      }
    };
    updateContainers();
  }, [containers]);

  useEffect(() => {
    const barcodeLengths = [4, 12, 13];
    if (!props.itemId && barcodeLengths.includes(props.code.length)) {
      autofillWithProductInfo();
    }
  }, [props.code, autofillWithProductInfo, props.itemId]);

  const getOptions = () => {
    return containers?.map((cont) => <option key={cont} value={cont}></option>);
  };

  const onContainerChange = (e) => {
    setContainer(e.target.value);
  };

  const tryAddingContainer = () => {
    if (
      !containers.includes(container) &&
      container !== "" &&
      container.length < 40
    ) {
      ServerFacade.addContainer(container);
      containers.push(container);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("YOOYOY");

    props.setCode("");
    setName("");
    setBrand("");
    setDescription("");
    setTags("");
    setAmount("");
    setUnit("");
    setQuantity(1);
    props.onSubmit({
      id: props.itemId,
      code: props.code,
      name,
      brand,
      description,
      tags,
      amount,
      unit,
      quantity,
      container,
      expiration,
    });
    tryAddingContainer();
  };

  return (
    <SRForm onSubmit={onSubmit}>
      <SRTextInput
        label="Barcode Number:"
        type="number"
        value={props.code}
        onChange={(e) => props.setCode(e.target.value)}
      ></SRTextInput>
      <SRTextInput
        label="Item Name:"
        value={name}
        placeholder={name === "" && props.code !== "" ? "No results" : ""}
        onChange={(e) => setName(e.target.value)}
      ></SRTextInput>
      <SRTextInput
        label="Brand Name:"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      ></SRTextInput>
      <SRTextInput
        label="Description:"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></SRTextInput>
      <SRTextInput
        label="Tags:"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      ></SRTextInput>
      <SRFlex>
        <SRFlexItem numItems={2}>
          <SRTextInput
            label="Amount:"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></SRTextInput>
        </SRFlexItem>
        <SRFlexItem numItems={2}>
          <SRTextInput
            label="Unit:"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          ></SRTextInput>
        </SRFlexItem>
      </SRFlex>
      <SRDropDown
        label="Container:"
        listName="containerList"
        onChange={onContainerChange}
        value={container}
        options={getOptions()}
      ></SRDropDown>
      <SRDateInput
        label="Expiration:"
        value={expiration}
        onChange={(e) => setExpiration(e.target.value)}
      ></SRDateInput>
      {props.shouldShowQuantityField && (
        <SRTextInput
          label="Quantity:"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        ></SRTextInput>
      )}
      <SRFlex justifyContent="center">
        <SRButton onClick={onSubmit} type="submit">
          {props.submitLabel}
        </SRButton>
      </SRFlex>
    </SRForm>
  );
};

export default ItemForm;
