import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

import { ICreatePassword, TPassword, IPasswordConstraint } from "../../interfaces/password.model";
import CheckboxOptionItem, { CheckboxValuesEnum } from "./CheckboxOptionItem/CheckboxOptionItem";
import ErrorsConstants from "../../constants/errors";
import ErrorDisplay from "../common/ErrorDisplay/ErrorDisplay";
import GenericInput from "./GenericInput/GenericInput";
import LabelsConstants from "../../constants/labels";
import PasswordService from "../../services/password.service";
import SubmitButton from "../common/SubmitButton/SubmitButton";

import "./CreatePasswordForm.css";

const CreatePasswordForm = () => {
  const { createPassword, modifyPreferences, localData } = useLocalStorage();

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

  useEffect(() => {
    if (localData.preferences) {
      setLength(localData.preferences.length);
      setAreChecked(localData.preferences.constraints);
    }
  }, [localData]);

  /**
   * Handle the check action by inversing the value of the specified key
   * @param key CheckboxValuesEnum key
   */
  const handleCheckAction = (key: keyof typeof CheckboxValuesEnum) => {
    modifyPreferences({
      length: isLength,
      constraints: {
        ...areChecked,
        [key]: !areChecked[key],
      },
    });

    setAreChecked((previousState) => ({
      ...previousState,
      [key]: !previousState[key],
    }));
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
        modifyPreferences({ length: value, constraints: areChecked });
        setLength(value);
        break;
      default:
        console.warn(`Input value '${typeof value}' is not supported`);
        break;
    }
  };

  /**
   * creates a new password item with the current properties
   * @param event event from the form
   */
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
    const passwordData: TPassword = PasswordService.generatePassword(credentials);

    createPassword(passwordData);
  };

  return (
    <form className="form create-password-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <GenericInput
          inputType="text"
          inputLabel="Titre"
          inputKey="name"
          inputInitValue={isTitle}
          inputPlaceholder="Entrez un titre..."
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
              isChecked={areChecked[key as keyof typeof CheckboxValuesEnum] || false}
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
