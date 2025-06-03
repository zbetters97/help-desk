import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./success-alert.scss";

const SuccessAlert = ({ message, link, icon, onClick }) => {
  return (
    <div className="success">
      <div className="success__message">
        <FontAwesomeIcon icon={faCircleCheck} />
        <p>{message}</p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="success__button"
        aria-label="continue"
      >
        <p>{link}</p>
        <FontAwesomeIcon icon={icon} />
      </button>
    </div>
  );
};

export default SuccessAlert;
