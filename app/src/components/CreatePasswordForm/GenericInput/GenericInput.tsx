import React from "react";
import "./GenericInput.css";

interface IGenericInput {
  inputType: "text" | "number";
  inputLabel: string;
  inputKey: string;
  inputPlaceholder?: string;
  inputInitValue?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string | number) => void;
}

const GenericInput = ({
  inputType,
  inputLabel,
  inputKey,
  inputPlaceholder,
  inputInitValue,
  onChange,
}: IGenericInput) => {
  return (
    <label className="generic-input" htmlFor={inputKey}>
      <span>{inputLabel}</span>
      <input
        className={`${inputType}-input`}
        required
        type={inputType}
        min={8}
        onChange={(e) => onChange(e, inputType === "number" ? Number(e.target.value) : e.target.value)}
        id={inputKey}
        name={inputKey}
        value={inputInitValue}
        placeholder={inputPlaceholder}
      />
    </label>
  );
};

export default GenericInput;
