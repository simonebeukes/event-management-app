import { useMemo } from "react";
import { Card, Form } from "react-bootstrap";
import {
  MONTHS,
  getDaysInMonth,
  getFirstDayOfWeek,
  formatDateKey,
} from "../utils/dateUtils";

const Calendar = ({
  year,
  monthIndex,
  onChangeYear,
  onChangeMonth,
  events,
  selectedDate,
  onSelectDate,
}) => {
  const todayKey = formatDateKey(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const days = useMemo(() => {
    const totalDays = getDaysInMonth(year, monthIndex);
    const firstWeekday = getFirstDayOfWeek(year, monthIndex);
    const cells = [];
    const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // header labels
    for (let i = 0; i < labels.length; i++) {
      cells.push(
        <div key={`label-${i}`} className="calendar-cell-header">
          {labels[i]}
        </div>
      );
    }

    // leading empty cells
    for (let i = 0; i < firstWeekday; i++) {
      cells.push(<div key={`empty-${i}`} />);
    }

    // days
    for (let day = 1; day <= totalDays; day++) {
      const dateKey = formatDateKey(year, monthIndex, day);
      const dayEvents = events.filter((ev) => ev.date === dateKey);

      cells.push(
        <button
          type="button"
          key={dateKey}
          className={`calendar-cell text-start btn p-1 ${
            dateKey === todayKey ? "calendar-cell-today" : ""
          } ${selectedDate === dateKey ? "border-primary" : ""}`}
          onClick={() => onSelectDate(dateKey)}
        >
          <div className="fw-semibold mb-1">{day}</div>
          {dayEvents.slice(0, 3).map((ev) => (
            <span key={ev.id} className="calendar-event">
              {ev.name}
            </span>
          ))}
          {dayEvents.length > 3 && (
            <span className="calendar-event text-muted">+ more</span>
          )}
        </button>
      );
    }

    return cells;
  }, [year, monthIndex, events, selectedDate, todayKey, onSelectDate]);

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    years.push(y);
  }

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <Form.Select
            style={{ maxWidth: 180 }}
            value={monthIndex}
            onChange={(e) => onChangeMonth(Number(e.target.value))}
          >
            {MONTHS.map((m, idx) => (
              <option key={m} value={idx}>
                {m}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            style={{ maxWidth: 140 }}
            value={year}
            onChange={(e) => onChangeYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="calendar-grid">{days}</div>
      </Card.Body>
    </Card>
  );
};

export default Calendar;
