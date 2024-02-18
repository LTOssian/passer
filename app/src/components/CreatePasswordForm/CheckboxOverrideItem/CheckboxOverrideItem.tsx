import CheckedSvg from "../../../assets/checked.svg";
import NotCheckedSvg from "../../../assets/not-checked.svg";

import "./CheckboxOverrideItem.css";

export interface ICheckboxOverrideItemProps {
  isChecked: boolean;
  checkboxLabel: string;
}

const CheckboxOverrideItem = ({ isChecked, checkboxLabel }: ICheckboxOverrideItemProps) => {
  return (
    <div className="checkbox-override-item" tabIndex={0}>
      <img
        src={isChecked ? CheckedSvg : NotCheckedSvg}
        alt={`checkbox icon, currently ${isChecked ? "checked" : "not checked"}`}
      />
      <span>{checkboxLabel}</span>
    </div>
  );
};

export default CheckboxOverrideItem;
