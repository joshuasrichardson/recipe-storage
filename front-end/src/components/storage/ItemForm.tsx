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
// @ts-ignore
import { formatDateInput, srDate } from "../../utils/utils.ts";
// @ts-ignore
import { Item } from "../../types.ts";

type ItemFormProps = {
  code: string;
  setCode: (code: string) => void;
  itemId?: string;
  submitLabel: string;
  onSubmit: (item: Item) => void;
  setImageUrl: (url: string) => void;
  shouldShowQuantityField?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const ItemForm: React.FC<ItemFormProps> = (
  props: ItemFormProps
): ReactElement => {
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [containers, setContainers] = useState<string[]>([]);
  const [container, setContainer] = useState<string>("");
  const [expiration, setExpiration] = useState(srDate());
  const [tags, setTags] = useState<string>("");
  const [amount, setAmount] = useState<string | number>("");
  const [unit, setUnit] = useState<string>("");
  const [quantity, setQuantity] = useState<string | number>(1);

  const autofillWithProductInfo = useCallback(async () => {
    if (props?.code) {
      const item = await ServerFacade.getProduct(props.code);

      if (item == null) return;
      setName(item.name || "");
      setBrand(item.brand || "");
      setDescription(item.description || "");
      setTags(item.tags || "");
      setAmount(item.amount || "");
      setUnit(item.unit || "");
      props.setImageUrl(item.src || "");
      if (containers?.includes(item.container)) {
        setContainer(item.container || "");
      } else {
        const cont = await ServerFacade.getItemContainer(item.code);
        setContainer(cont || containers[0] || "");
      }
    }
  }, [props, containers]);

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
    if (props?.itemId) setItem();
  }, [props, name]);

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
    if (!props?.itemId && barcodeLengths.includes(props?.code?.length)) {
      autofillWithProductInfo();
    }
  }, [props, autofillWithProductInfo]);

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

    props.setCode("");
    setName("");
    setBrand("");
    setDescription("");
    setTags("");
    setAmount("");
    setUnit("");
    setQuantity(1);
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
        label="Name:"
        value={name}
        placeholder={name === "" && props.code !== "" ? "No results" : ""}
        onChange={(e) => setName(e.target.value)}
      ></SRTextInput>
      <SRTextInput
        label="Brand:"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      ></SRTextInput>
      <SRTextInput
        label="Description:"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></SRTextInput>
      <SRTextInput
        label="Keywords:"
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
        label="Location:"
        listName="containerList"
        onChange={onContainerChange}
        value={container}
      >
        {getOptions()}
      </SRDropDown>
      <SRDateInput
        label="Expiration:"
        value={formatDateInput(expiration)}
        onChange={(e) => setExpiration(srDate(e.target.value))}
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
