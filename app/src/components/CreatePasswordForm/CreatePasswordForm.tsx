import React, { useState } from "react";

import CheckboxOptionItem, { CheckboxValuesEnum } from "./CheckboxOptionItem/CheckboxOptionItem";
import GenericInput from "./GenericInput/GenericInput";
import LabelsConstants from "../../constants/labels";
import SubmitButton from "./SubmitButton/SubmitButton";

import "./CreatePasswordForm.css";

// Describes the state of the checkboxes
export type ICheckboxState = Record<keyof typeof CheckboxValuesEnum, boolean>;

const CreatePasswordForm = () => {
  // Initialize the record and set every key to false
  const [areChecked, setAreChecked] = useState<ICheckboxState>(
    Object.keys(CheckboxValuesEnum).reduce((acc, key) => {
      acc[key as keyof typeof CheckboxValuesEnum] = false;
      return acc;
    }, {} as ICheckboxState)
  );

  const [isLength, setLength] = useState<number>(8);
  const [isName, setName] = useState<string>("");

  /**
   * Handle the check action by inversing the value of the specified key
   * @param key CheckboxValuesEnum key
   */
  const handleCheckAction = (key: keyof typeof CheckboxValuesEnum) => {
    setAreChecked((previousState) => ({
      ...previousState,
      [key]: !previousState[key],
    }));

    // DEBUG
    // console.log("new change", areChecked, key)
  };

  /**
   * Handle the change action by setting the state to the value of the input
   * @param event event from the generic inputs
   * @param value value received from the inputs
   */
  const handleInputAction = (event: React.ChangeEvent<HTMLInputElement>, value: string | number) => {
    event.preventDefault();

    switch (typeof value) {
      case "string":
        setName(value);
        break;
      case "number":
        setLength(value);
        break;
      default:
        console.warn(`Input value '${typeof value}' is not supported`);
        break;
    }

    // DEBUG
    // console.log("new change", value, typeof value);
    // console.log("name", isName);
    // console.log("length", isLength);
  };

  return (
    <form
      className="form create-password-form"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(areChecked);
        console.log(isName);
        console.log(isLength);
      }}
    >
      <div className="input-container">
        <GenericInput
          inputType="text"
          inputLabel="Nom"
          inputKey="name"
          inputInitValue={isName}
          inputPlaceholder="Nom du MDP"
          onChange={handleInputAction}
        />
        <GenericInput
          inputType="number"
          inputLabel="Nombre de caractères"
          inputKey="length"
          inputInitValue={isLength}
          onChange={handleInputAction}
        />
      </div>
      <div className="checkbox-container">
        {Object.entries(CheckboxValuesEnum).map(([key, value]) => {
          return (
            <CheckboxOptionItem
              key={key}
              checkboxKey={key as keyof typeof CheckboxValuesEnum}
              checkboxLabel={LabelsConstants[key as keyof typeof CheckboxValuesEnum]}
              checkboxType={value}
              isChecked={areChecked[key as keyof typeof CheckboxValuesEnum]}
              onChangeAction={handleCheckAction}
            />
          );
        })}
      </div>
      <SubmitButton buttonText="Générer" />
    </form>
  );
};

export default CreatePasswordForm;
