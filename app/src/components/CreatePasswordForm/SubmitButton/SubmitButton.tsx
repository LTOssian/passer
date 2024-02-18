import "./SubmitButton.css";

interface ISubmitButtonProps {
  buttonText: string;
}

const SubmitButton = ({ buttonText }: ISubmitButtonProps) => {
  return <button type="submit">{buttonText}</button>;
};

export default SubmitButton;
