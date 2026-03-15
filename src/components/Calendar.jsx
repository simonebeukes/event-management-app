import { useMemo } from "react";
import { Card, Form } from "react-bootstrap";
import {
  MONTHS,
  getDaysInMonth,
  getFirstDayOfWeek,
  formatDateKey,
} from "../utils/dateUtils";

/* Calendar:
  - Renders a month view calendar with selectable dates.
 - Shows up to 3 event names per day and a "+ more" indicator if there are more.
 - Month and year can be changed via dropdowns. */
const Calendar = ({
  year,          // currently selected year (number)
  monthIndex,    // currently selected month index (0–11)
  onChangeYear,  // callback when the year dropdown changes
  onChangeMonth, // callback when the month dropdown changes
  events,        // array of all events for the user
  selectedDate,  // currently selected date key (YYYY-MM-DD)
  onSelectDate,  // callback when a date cell is clicked
}) => {
  // Today, formatted into the same YYYY-MM-DD key used for events
  const todayKey = formatDateKey(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  /* Build the calendar cells (weekday headers, empty leading cells, and days).
    useMemo only recomputes when year, monthIndex, events, selectedDate, etc. change.*/
  const days = useMemo(() => {
    const totalDays = getDaysInMonth(year, monthIndex);
    const firstWeekday = getFirstDayOfWeek(year, monthIndex);
    const cells = [];
    const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Weekday header labels: Sun–Sat
    for (let i = 0; i < labels.length; i++) {
      cells.push(
        <div key={`label-${i}`} className="calendar-cell-header">
          {labels[i]}
        </div>
      );
    }

    // Leading empty cells to align the first day correctly under its weekday
    for (let i = 0; i < firstWeekday; i++) {
      cells.push(<div key={`empty-${i}`} />);
    }

    // Actual day cells for the current month
    for (let day = 1; day <= totalDays; day++) {
      const dateKey = formatDateKey(year, monthIndex, day);

      // Events that fall on this specific date
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
          {/* Day number */}
          <div className="fw-semibold mb-1">{day}</div>

          {/* Show up to 3 event names as pills */}
          {dayEvents.slice(0, 3).map((ev) => (
            <span key={ev.id} className="calendar-event">
              {ev.name}
            </span>
          ))}

          {/* Indicate there are more events beyond the first 3 */}
          {dayEvents.length > 3 && (
            <span className="calendar-event text-muted">+ more</span>
          )}
        </button>
      );
    }

    return cells;
  }, [year, monthIndex, events, selectedDate, todayKey, onSelectDate]);

  // Build a small range of years around the current year for the year dropdown
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    years.push(y);
  }

  return (
    <Card>
      <Card.Body>
        {/* Month / year selectors above the calendar grid */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          {/* Month dropdown */}
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

          {/* Year dropdown */}
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

        {/* Calendar grid containing weekday headers + day cells */}
        <div className="calendar-grid">{days}</div>
      </Card.Body>
    </Card>
  );
};

export default Calendar;
