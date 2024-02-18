import { useState } from "react";

import { CheckboxOptionItem, CheckboxValuesEnum } from "./CheckboxOptionItem/CheckboxOptionItem";
import { LabelsConstants } from "../../constants/labels";

import "./CreatePasswordForm.css";

// Describes the state of the checkboxes
export type ICheckboxState = Record<keyof typeof CheckboxValuesEnum, boolean>;

export const CreatePasswordForm = () => {
  // Initialize the record and set every key to false
  const [areChecked, setAreChecked] = useState<ICheckboxState>(
    Object.keys(CheckboxValuesEnum).reduce((acc, key) => {
      acc[key as keyof typeof CheckboxValuesEnum] = false;
      return acc;
    }, {} as ICheckboxState)
  );

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

  return (
    <div className="create-password-form">
      <form className="form">
        <div className="input-container">ici</div>
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
      </form>
    </div>
  );
};
