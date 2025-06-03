import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./alert.scss";

const Alert = ({ message }) => {
  return (
    <div className="alert" aria-expanded={message ? "true" : "false"}>
      <FontAwesomeIcon icon={faCircleExclamation} className="alert__icon" />
      <p>{message}</p>
    </div>
  );
};

export default Alert;
