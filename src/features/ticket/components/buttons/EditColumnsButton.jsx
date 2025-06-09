import { useEffect, useState } from "react";
import Modal from "src/features/modal/Modal";
import { useAuthContext } from "src/features/auth/context/AuthContext";
import TicketSave from "./TicketSave";
import "../forms/ticket-form.scss";

const EditColumnsButton = () => {
  const { globalUser, updateGlobalUserColumns, updateUserColumns } =
    useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedColumns, setCheckedColumns] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("lock-scroll");
    }

    if (!globalUser) return;

    setCheckedColumns(globalUser.columns);
  }, [isModalOpen, globalUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserColumns(globalUser.uid, checkedColumns);

    updateGlobalUserColumns(checkedColumns);

    setIsModalOpen(false);
  };

  if (!globalUser) return null;

  return (
    <div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <form
          onSubmit={handleSubmit}
          className="ticket-form ticket-form--columns"
        >
          <h3 className="ticket-form__title">Edit columns</h3>
          <ColumnCheckbox
            name="created"
            label="Created at"
            checkedColumns={checkedColumns}
            setCheckedColumns={setCheckedColumns}
          />
          <ColumnCheckbox
            name="status"
            label="Status"
            checkedColumns={checkedColumns}
            setCheckedColumns={setCheckedColumns}
          />
          <ColumnCheckbox
            name="subject"
            label="Subject"
            checkedColumns={checkedColumns}
            setCheckedColumns={setCheckedColumns}
          />
          <ColumnCheckbox
            name="requester"
            label="Requester"
            checkedColumns={checkedColumns}
            setCheckedColumns={setCheckedColumns}
          />
          <ColumnCheckbox
            name="assignee"
            label="Assignee"
            checkedColumns={checkedColumns}
            setCheckedColumns={setCheckedColumns}
          />
          <ColumnCheckbox
            name="priority"
            label="Priority"
            checkedColumns={checkedColumns}
            setCheckedColumns={setCheckedColumns}
          />
          <ColumnCheckbox
            name="severity"
            label="Severity"
            checkedColumns={checkedColumns}
            setCheckedColumns={setCheckedColumns}
          />
          <ColumnCheckbox
            name="updated"
            label="Updated at"
            checkedColumns={checkedColumns}
            setCheckedColumns={setCheckedColumns}
          />
          <TicketSave />
        </form>
      </Modal>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="home__columns-button"
      >
        <p>Edit columns</p>
      </button>
    </div>
  );
};

const ColumnCheckbox = ({ name, label, checkedColumns, setCheckedColumns }) => {
  const handleCheck = (e) => {
    if (e.target.checked) {
      setCheckedColumns([...checkedColumns, name]);
    } else {
      setCheckedColumns(checkedColumns.filter((column) => column !== name));
    }
  };

  return (
    <div className="ticket-form__row">
      <label htmlFor={name} className="ticket-form__label">
        {label}
      </label>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checkedColumns.includes(name) || false}
        onChange={(e) => handleCheck(e)}
        className="ticket-form__checkbox"
      />
    </div>
  );
};

export default EditColumnsButton;
