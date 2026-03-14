import { useEffect, useMemo, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Calendar from "../components/Calendar";
import EventList from "../components/EventList";
import { formatDateKey } from "../utils/dateUtils";

const Dashboard = () => {
  const { user, events, logout } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [monthIndex, setMonthIndex] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState(
    formatDateKey(now.getFullYear(), now.getMonth(), now.getDate())
  );

  useEffect(() => {
    const focusDate = location.state?.focusDate;
    if (focusDate) {
      setSelectedDate(focusDate);
    }
  }, [location.state]);

  useEffect(() => {
    const d = new Date(selectedDate);
    setYear(d.getFullYear());
    setMonthIndex(d.getMonth());
  }, [selectedDate]);

  const eventsForSelectedDate = useMemo(
    () => events.filter((ev) => ev.date === selectedDate),
    [events, selectedDate]
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">
          Welcome {user?.username || user?.name || "User"}!
        </h1>
        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="dashboard-layout">
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
        <div className="mb-3">
          <EventList events={eventsForSelectedDate} />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
