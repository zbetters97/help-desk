import { useEffect, useState } from "react";
import Modal from "src/features/modal/Modal";
import { useAuthContext } from "src/features/auth/context/AuthContext";
import CreateContact from "src/features/auth/components/forms/CreateContact";

const TicketRequester = ({ selected, setSelected }) => {
  const { getAllUsers } = useAuthContext();
  const [requesterList, setRequesterList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setRequesterList(users);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("lock-scroll");
    }
  }, [isModalOpen]);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  if (!requesterList) return null;

  return (
    <div className="ticket-form__field">
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <CreateContact setIsModalOpen={setIsModalOpen} />
      </Modal>

      <div className="ticket-form__select-title">
        <label htmlFor="requester" className="ticket-form__label">
          Requester
        </label>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="ticket-form__highlight"
        >
          Create contact
        </button>
      </div>

      <select
        id="requester"
        name="requester"
        value={selected}
        onChange={handleChange}
        className="ticket-form__select"
      >
        <option value="" disabled>
          -- Choose an option --
        </option>
        {requesterList.map((requester) => (
          <option
            key={requester.id}
            value={requester.id}
            className="ticket-form__option"
          >
            {requester.displayname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TicketRequester;
