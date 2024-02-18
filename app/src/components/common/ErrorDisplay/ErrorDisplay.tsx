import "./ErrorDisplay.css";

interface IErrorDisplay {
  errors: string[];
}

const ErrorDisplay = ({ errors }: IErrorDisplay) => {
  return (
    <>
      {errors.map((error, index) => {
        return (
          <p className="error-text" key={index}>
            {error}
          </p>
        );
      })}
    </>
  );
};

export default ErrorDisplay;
