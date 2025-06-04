import { useEffect, useState } from "react";
import { useAuthContext } from "src/features/auth/context/AuthContext";

const TicketAssignee = ({ selected, setSelected }) => {
  const { globalUser } = useAuthContext();
  const { getAllUsers } = useAuthContext();

  const [assigneeList, setAssigneeList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setAssigneeList(users);
    };

    fetchUsers();
  }, []);

  const handleClick = () => {
    if (globalUser) {
      document.getElementById("assignee").value = globalUser.uid;
    }
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  if (!assigneeList) return null;

  return (
    <div className="ticket-form__field">
      <div className="ticket-form__select-title">
        <label htmlFor="assignee" className="ticket-form__label">
          Assignee
        </label>
        <button
          type="button"
          onClick={handleClick}
          className="ticket-form__highlight"
        >
          Assign to me
        </button>
      </div>

      <select
        id="assignee"
        name="assignee"
        value={selected}
        onChange={handleChange}
        className="ticket-form__select"
      >
        <option value="" disabled>
          -- Choose an option --
        </option>
        {assigneeList.map((assignee) => (
          <option
            key={assignee.id}
            value={assignee.id}
            className="ticket-form__option"
          >
            {assignee.displayname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TicketAssignee;
