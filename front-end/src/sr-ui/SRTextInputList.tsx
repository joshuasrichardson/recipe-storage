import React, { ReactElement } from "react";
import SRTextInput from "./SRTextInput";
import SRButton from "./SRButton";

type setValueFunction = (prev: string[]) => string[];

interface SRTextInputListProps {
  label: string;
  values: string[];
  setValues: (func: setValueFunction) => void;
}

const SRTextInputList = ({
  label,
  values,
  setValues,
}: SRTextInputListProps): ReactElement => {
  const onChange = (value: string, index: number) => {
    setValues((prev: string[]) => [
      ...prev.slice(0, index),
      value,
      ...prev.slice(index + 1, prev.length),
    ]);
  };

  const addValue = () => setValues((prev: string[]) => [...prev, ""]);

  return (
    <>
      {values.map((value: string, index: number) => (
        <SRTextInput
          key={`input-${index}`}
          label={index === 0 ? label : ""}
          value={value}
          onChange={(e) => onChange(e.target.value, index)}
        />
      ))}
      <SRButton size="small" onClick={addValue}>
        +
      </SRButton>
    </>
  );
};

export default SRTextInputList;
