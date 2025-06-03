import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const FormSwitchButton = ({ header, label, direction, setIsSignup }) => {
  return (
    <div className="auth__back">
      <p>{header}</p>
      <button
        type="button"
        onClick={() => setIsSignup((prev) => !prev)}
        className={`auth__back-button auth__back-button--${direction}`}
      >
        {direction === "before" && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="auth__arrow auth__arrow--before"
          />
        )}
        <p>{label}</p>
        {direction === "after" && (
          <FontAwesomeIcon
            icon={faArrowRight}
            className="auth__arrow auth__arrow--after"
          />
        )}
      </button>
    </div>
  );
};

export default FormSwitchButton;
