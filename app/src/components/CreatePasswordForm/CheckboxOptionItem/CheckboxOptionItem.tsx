import CheckboxOverrideItem from "../CheckboxOverrideItem/CheckboxOverrideItem";
import LabelsConstants from "../../../constants/labels";

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

const CheckboxOptionItem = ({
  checkboxLabel,
  checkboxType,
  isChecked,
  onChangeAction,
  checkboxKey,
}: ICheckboxOptionItemProps) => {
  /**
   * Enheance accessibility for keyboard only users by handling key events on input
   * @param event input checkbox event
   */
  const handleKeyUp = (event: React.KeyboardEvent<HTMLElement>) => {
    // Check if the key pressed is either Enter or Space
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onChangeAction(checkboxKey);
    }
  };

  return (
    <label className="checkbox-option-item" htmlFor={checkboxType} onKeyUp={(e) => handleKeyUp(e)}>
      <input
        type="checkbox"
        name={checkboxType}
        checked={isChecked}
        id={checkboxType}
        onChange={() => onChangeAction(checkboxKey)}
      />
      <CheckboxOverrideItem isChecked={isChecked} checkboxLabel={checkboxLabel} />
    </label>
  );
};

export default CheckboxOptionItem;
