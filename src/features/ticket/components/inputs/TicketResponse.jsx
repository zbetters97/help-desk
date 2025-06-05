import { useEffect, useState } from "react";
import { useAuthContext } from "src/features/auth/context/AuthContext";
import { useTicketContext } from "../../context/TicketContext";

const TicketResponse = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const [canPublish, setCanPublish] = useState(false);

  useEffect(() => {
    setCanPublish(message !== "");
  }, [message]);

  return (
    <div className="ticket-form__box ticket-form__response">
      <label htmlFor="response" className="ticket-form__label">
        Public response
      </label>

      <Textbox message={message} setMessage={setMessage} />
      <div className="ticket-form__response-buttons">
        <CancelButton setMessage={setMessage} canPublish={canPublish} />
        <PublishButton
          chatId={chatId}
          message={message}
          setMessage={setMessage}
          canPublish={canPublish}
        />
      </div>
    </div>
  );
};

const Textbox = ({ message, setMessage }) => {
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <textarea
      id="response"
      name="response"
      placeholder="Add a public response..."
      value={message}
      onChange={handleChange}
      className="ticket-form__textarea"
    />
  );
};

const CancelButton = ({ setMessage, canPublish }) => {
  const handleCancelResponse = () => {
    setMessage("");
  };

  return (
    <button
      type="button"
      onClick={handleCancelResponse}
      disabled={!canPublish}
      className="ticket-form__cancel"
    >
      Discard
    </button>
  );
};

const PublishButton = ({ chatId, message, setMessage, canPublish }) => {
  const { globalUser } = useAuthContext();
  const { addMessage } = useTicketContext();

  const handleAddResponse = async () => {
    await addMessage(chatId, globalUser.uid, message);
    setMessage("");
  };

  return (
    <button
      type="button"
      onClick={handleAddResponse}
      disabled={!canPublish}
      className="ticket-form__publish"
    >
      Publish
    </button>
  );
};

export default TicketResponse;
