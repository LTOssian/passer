import "./SubmitButton.css";
import RightArrow from "../../../assets/right-arrow.svg";
import IconsWidthEnum from "../../../constants/constants";

interface ISubmitButtonProps {
  buttonText: string;
}

const SubmitButton = ({ buttonText }: ISubmitButtonProps) => {
  return (
    <button type="submit">
      {buttonText} <img src={RightArrow} alt="Flèche vers le droite" width={IconsWidthEnum.SMALL} />
    </button>
  );
};

export default SubmitButton;
