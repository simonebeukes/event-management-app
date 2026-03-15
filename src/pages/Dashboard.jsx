import { useEffect, useMemo, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Calendar from "../components/Calendar";
import EventList from "../components/EventList";
import { formatDateKey } from "../utils/dateUtils";

/* Dashboard:
 - Main authenticated screen for the user.
 - Shows a calendar on the left and a list of events for the selected date on the right. */
const Dashboard = () => {
  // Global context: current user, all events and logout action
  const { user, events, logout } = useAppContext();

  // React Router helpers:
  // - location: to read any navigation state (e.g. focusDate)
  // - navigate: to programmatically redirect after logout
  const location = useLocation();
  const navigate = useNavigate();

  // Today's date (used for initial state)
  const now = new Date();

  // Calendar state: year, month, and selected date
  const [year, setYear] = useState(now.getFullYear());
  const [monthIndex, setMonthIndex] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState(
    formatDateKey(now.getFullYear(), now.getMonth(), now.getDate())
  );

  // When we navigate here with a focusDate in location.state, update the selected date so the calendar jumps to that day. 
  // Example: after saving an event, we pass focusDate from AddEvent.
  useEffect(() => {
    const focusDate = location.state?.focusDate;
    if (focusDate) {
      setSelectedDate(focusDate);
    }
  }, [location.state]);

  // Keep year and month in sync with the selectedDate.
  // If the user clicks a day in a different month/year, the dropdowns update.
  useEffect(() => {
    const d = new Date(selectedDate);
    setYear(d.getFullYear());
    setMonthIndex(d.getMonth());
  }, [selectedDate]);

  // Compute all events that belong to the currently selected date.
  // useMemo avoids recalculating on every render unless events or selectedDate change.
  const eventsForSelectedDate = useMemo(
    () => events.filter((ev) => ev.date === selectedDate),
    [events, selectedDate]
  );

  /* Handle logout:
   - Clear user/events from context
   - Navigate back to Home (which will show the "logged out" message) */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container>
      {/* Header row: greeting on the left, logout button on the right */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">
          Welcome {user?.username || user?.name || "User"}!
        </h1>
        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Main layout: calendar + event list */}
      <div className="dashboard-layout">
        {/* Calendar section */}
        <div className="mb-3">
          <Calendar
            year={year}
            monthIndex={monthIndex}
            onChangeYear={setYear}
            onChangeMonth={setMonthIndex}
            events={events}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>

        {/* Event list for selected date */}
        <div className="mb-3">
          <EventList events={eventsForSelectedDate} />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
