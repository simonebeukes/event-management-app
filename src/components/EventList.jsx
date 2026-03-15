import { Card, ListGroup, Button } from "react-bootstrap";
import { getWeekdayName } from "../utils/dateUtils";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

/* EventList:
 - Renders all events for the currently selected date.
 - Allows editing and deleting individual events. */
const EventList = ({ events }) => {
  const { setEditingEvent, deleteEvent } = useAppContext();
  const navigate = useNavigate();

  /* Handle clicking "Edit":
   - Store the selected event in context
   - Navigate to the Add Event page, which will prefill the form */
  const handleEdit = (event) => {
    setEditingEvent(event);
    navigate("/add-event");
  };

  /* Handle clicking "Delete":
   - Ask for confirmation
   - Remove the event from context if confirmed */
  const handleDelete = (id) => {
    if (window.confirm("Delete this event?")) {
      deleteEvent(id);
    }
  };

  // If there are no events for this date, show an empty state card
  if (!events.length) {
    return (
      <Card>
        <Card.Body>
          <h5>No events on this date</h5>
          <p className="text-muted mb-0">
            Select another date or add a new event from the Add Event page.
          </p>
        </Card.Body>
      </Card>
    );
  }

  // Render list of events with time, name, date, location and details
  return (
    <Card>
      <Card.Body>
        <h5 className="mb-3">Events</h5>
        <ListGroup variant="flush">
          {events.map((ev) => {
            // Weekday name for the event date
            const weekday = getWeekdayName(ev.date);

            // Localised short date (e.g. "14 Mar 2026")
            const dateFormatted = new Date(ev.date).toLocaleDateString(
              undefined,
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            );

            return (
              <ListGroup.Item key={ev.id}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    {/* Time range + event name */}
                    <div className="d-flex align-items-center mb-1">
                      <span className="me-2 fw-semibold">
                        {ev.startTime} – {ev.endTime}
                      </span>
                      <span className="fw-semibold">{ev.name}</span>
                    </div>

                    {/* Weekday and formatted date */}
                    <div className="text-muted small">
                      {weekday}, {dateFormatted}
                    </div>

                    {/* Optional location line */}
                    {ev.location && (
                      <div className="small mt-1">
                        <span className="fw-semibold">Location: </span>
                        <span>{ev.location}</span>
                      </div>
                    )}

                    {/* Optional details/notes */}
                    {ev.details && (
                      <div className="mt-1 small">{ev.details}</div>
                    )}
                  </div>

                  {/* Action buttons: Edit / Delete */}
                  <div className="ms-2 d-flex flex-column gap-1">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => handleEdit(ev)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(ev.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default EventList;
