import { CheckboxOverrideItem } from "../CheckboxOverrideItem/CheckboxOverrideItem";
import { LabelsConstants } from "../../../constants/labels";

import "./CheckboxOptionItem.css";

export enum CheckboxValuesEnum {
  Uppercase = "uppercase",
  Lowercase = "lowercase",
  Digit = "digit",
  Symbol = "symbol",
}

export interface ICheckboxOptionItemProps {
  checkboxLabel: LabelsConstants;
  checkboxType: CheckboxValuesEnum;
  isChecked: boolean;
  onChangeAction: (key: keyof typeof CheckboxValuesEnum) => void;
  checkboxKey: keyof typeof CheckboxValuesEnum;
}

export const CheckboxOptionItem = ({
  checkboxLabel,
  checkboxType,
  isChecked,
  onChangeAction,
  checkboxKey,
}: ICheckboxOptionItemProps) => {
  return (
    <label className="checkbox-option-item" htmlFor={checkboxType}>
      <input type="checkbox" name={checkboxType} id={checkboxType} onChange={() => onChangeAction(checkboxKey)} />
      <CheckboxOverrideItem isChecked={isChecked} checkboxLabel={checkboxLabel} />
    </label>
  );
};
