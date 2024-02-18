import React, { useState } from "react";

import { ICreatePassword, IPassword, IPasswordConstraint } from "../../interfaces/password.model";
import CheckboxOptionItem, { CheckboxValuesEnum } from "./CheckboxOptionItem/CheckboxOptionItem";
import ErrorsConstants from "../../constants/errors";
import ErrorDisplay from "../common/ErrorDisplay/ErrorDisplay";
import GenericInput from "./GenericInput/GenericInput";
import LabelsConstants from "../../constants/labels";
import PasswordService from "../../services/password.service";
import SubmitButton from "./SubmitButton/SubmitButton";

import "./CreatePasswordForm.css";

const CreatePasswordForm = () => {
  // Initialize the record and set every key to false
  const [areChecked, setAreChecked] = useState<IPasswordConstraint>(
    Object.keys(CheckboxValuesEnum).reduce((acc, key) => {
      acc[key as keyof typeof CheckboxValuesEnum] = false;
      return acc;
    }, {} as IPasswordConstraint)
  );

  const [isLength, setLength] = useState<number>(8);
  const [isTitle, setName] = useState<string>("");
  const [isError, setError] = useState<string>();

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
    // console.log("name", isTitle);
    // console.log("length", isLength);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!areChecked.Digit && !areChecked.Lowercase && !areChecked.Symbol && !areChecked.Uppercase) {
      setError(ErrorsConstants.REQUIRED_INCLUDES);
      setTimeout(() => {
        setError(undefined);
      }, 5000);

      return;
    } else {
      setError(undefined);
    }

    const credentials: ICreatePassword = {
      title: isTitle,
      length: isLength,
      constraints: areChecked,
    };

    const passwordData: IPassword = PasswordService.generatePassword(credentials);

    console.log(passwordData);

    // DEBUG
    // console.log(event);
    // console.log(areChecked);
    // console.log(isTitle);
    // console.log(isLength);
  };

  return (
    <form className="form create-password-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <GenericInput
          inputType="text"
          inputLabel="Titre"
          inputKey="name"
          inputInitValue={isTitle}
          inputPlaceholder="Titre du mdp"
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

      {isError && <ErrorDisplay errors={[isError]} />}
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
