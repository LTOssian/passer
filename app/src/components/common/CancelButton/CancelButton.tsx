import LeftArrow from "../../../assets/left-arrow.svg";
import IconsWidthEnum from "../../../constants/constants";

interface ICancelButtonProps {
  buttonText: string;
  onClick: () => void;
}
const CancelButton = ({ buttonText, onClick }: ICancelButtonProps) => {
  return (
    <button type="button" className="cancel" onClick={onClick}>
      <img src={LeftArrow} alt="Flèche vers la gauche" width={IconsWidthEnum.SMALL} /> {buttonText}
    </button>
  );
};

export default CancelButton;
