import IconsWidthEnum from "../../../constants/constants";
import "./IconDisplay.css";

interface IIconDisplayProps {
  src: string;
  alt: string;
  action: () => any;
}

const IconDisplay = ({ src, alt, action }: IIconDisplayProps) => {
  /**
   * Enheance accessibility for keyboard only users by handling key events on input
   * @param event input checkbox event
   */
  const handleKeyUp = (event: React.KeyboardEvent<HTMLElement>) => {
    // Check if the key pressed is enter or space
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  return <img src={src} alt={alt} tabIndex={0} onKeyUp={handleKeyUp} onClick={action} width={IconsWidthEnum.DEFAULT} />;
};

export default IconDisplay;
