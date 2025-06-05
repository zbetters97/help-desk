import { formatDateMDYShort, formatTime } from "src/utils/date";
import "./ticket-activity.scss";

const TicketActivity = ({ chats }) => {
  return (
    <div className=" ticket-form__box ticket-activity">
      <h3 className="ticket-activity__title">{`Ticket activity (${chats.length})`}</h3>

      {chats.map((chat) => {
        const initials =
          chat.firstname.charAt(0).toUpperCase() +
          chat.lastname.charAt(0).toUpperCase();

        const date = formatDateMDYShort(chat.createdAt.toDate());
        const time = formatTime(chat.createdAt.toDate());

        const dateTime = `${date} ${time}`;

        return (
          <div key={chat.id} className="ticket-activity__message">
            <p className="ticket-activity__avatar">{initials}</p>
            <div className="ticket-activity__content">
              <div className="ticket-activity__header">
                <p className="ticket-activity__name">{chat.displayname}</p>
                <p className="ticket-activity__date">{dateTime}</p>
              </div>

              <pre className="ticket-activity__text">{chat.message}</pre>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketActivity;
