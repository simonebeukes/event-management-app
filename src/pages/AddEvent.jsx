import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form as BsForm,
} from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { MONTHS, formatDateKey } from "../utils/dateUtils";

/* Yup schema for validating the event form:
 - name: required, max 40 chars
 - day: 1–31
 - monthIndex: 0–11 (Jan–Dec)
 - year: between 2000 and 2100
 - times: required
 - location: required, max 80 chars
 - details: optional text */
const eventSchema = Yup.object({
  name: Yup.string().max(40, "Max 40 characters").required("Required"),
  day: Yup.number().min(1).max(31).required("Required"),
  monthIndex: Yup.number().min(0).max(11).required("Required"),
  year: Yup.number().min(2000).max(2100).required("Required"),
  startTime: Yup.string().required("Required"),
  endTime: Yup.string().required("Required"),
  location: Yup.string().max(80, "Max 80 characters").required("Required"),
  details: Yup.string().nullable(),
});

//Generate time options in 30-minute increments (00:00 to 23:30) for the start/end time dropdowns
const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min of [0, 30]) {
      const h = String(hour).padStart(2, "0");
      const m = String(min).padStart(2, "0");
      options.push(`${h}:${m}`);
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

/* AddEvent:
 - Used for both adding and editing events.
 - If editingEvent exists in context, the form is prefilled and updates that event.
 - Otherwise, it creates a new event. */
const AddEvent = () => {
  const { addEvent, updateEvent, editingEvent } = useAppContext();
  const navigate = useNavigate();

  const now = new Date();

  // If editing, prefill with the existing event values; otherwise use defaults.
  const initialValues = editingEvent
    ? {
        name: editingEvent.name,
        day: Number(editingEvent.date.split("-")[2]),
        monthIndex: Number(editingEvent.date.split("-")[1]) - 1,
        year: Number(editingEvent.date.split("-")[0]),
        startTime: editingEvent.startTime,
        endTime: editingEvent.endTime,
        location: editingEvent.location || "",
        details: editingEvent.details || "",
      }
    : {
        name: "",
        day: now.getDate(),
        monthIndex: now.getMonth(),
        year: now.getFullYear(),
        startTime: "09:00",
        endTime: "10:00",
        location: "",
        details: "",
      };

  /* Submit handler for the form:
   - Builds a date key and base payload from form values.
   - If editing, updates an existing event; otherwise adds a new one.
   - Navigates back to the dashboard focused on the event's date. */
  const handleSubmit = (values) => {
    const dateKey = formatDateKey(values.year, values.monthIndex, values.day);

    const basePayload = {
      name: values.name,
      date: dateKey,
      startTime: values.startTime,
      endTime: values.endTime,
      location: values.location,
      details: values.details,
    };

    if (editingEvent && editingEvent.id) {
      updateEvent(editingEvent.id, { ...basePayload, id: editingEvent.id });
    } else {
      addEvent(basePayload);
    }

    // Return to dashboard and highlight the chosen date
    navigate("/dashboard", { state: { focusDate: dateKey } });
  };

  // Cancel handler discards changes and navigates back to the dashboard.
  const handleCancel = () => {
    navigate("/dashboard");
  };

  // Build a range of years around the current year for the year dropdown
  const years = [];
  const currentYear = now.getFullYear();
  for (let y = currentYear - 1; y <= currentYear + 5; y++) {
    years.push(y);
  }

  // Simple array of day numbers 1–31 for the day dropdown
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body>
              {/* Title changes based on add or edit mode */}
              <h1 className="mb-3">
                {editingEvent ? "Edit event" : "Add event"}
              </h1>

              {/* Formik handles form state + validation */}
              <Formik
                initialValues={initialValues}
                validationSchema={eventSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid, dirty }) => (
                  <Form>
                    {/* Event name */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Event name
                      </label>
                      <Field
                        id="name"
                        name="name"
                        className="form-control"
                        maxLength={40}
                      />
                      <div className="text-danger small">
                        <ErrorMessage name="name" />
                      </div>
                    </div>

                    {/* Date: Day, Month, Year */}
                    <Row className="mb-3">
                      <Col xs={4}>
                        <BsForm.Label>Day</BsForm.Label>
                        <Field as="select" name="day" className="form-select">
                          {days.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </Field>
                        <div className="text-danger small">
                          <ErrorMessage name="day" />
                        </div>
                      </Col>
                      <Col xs={4}>
                        <BsForm.Label>Month</BsForm.Label>
                        <Field
                          as="select"
                          name="monthIndex"
                          className="form-select"
                        >
                          {MONTHS.map((m, idx) => (
                            <option key={m} value={idx}>
                              {m}
                            </option>
                          ))}
                        </Field>
                        <div className="text-danger small">
                          <ErrorMessage name="monthIndex" />
                        </div>
                      </Col>
                      <Col xs={4}>
                        <BsForm.Label>Year</BsForm.Label>
                        <Field as="select" name="year" className="form-select">
                          {years.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </Field>
                        <div className="text-danger small">
                          <ErrorMessage name="year" />
                        </div>
                      </Col>
                    </Row>

                    {/* Time: Start / End */}
                    <Row className="mb-3">
                      <Col xs={6}>
                        <BsForm.Label>Start time</BsForm.Label>
                        <Field
                          as="select"
                          name="startTime"
                          className="form-select"
                        >
                          {timeOptions.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </Field>
                        <div className="text-danger small">
                          <ErrorMessage name="startTime" />
                        </div>
                      </Col>
                      <Col xs={6}>
                        <BsForm.Label>End time</BsForm.Label>
                        <Field
                          as="select"
                          name="endTime"
                          className="form-select"
                        >
                          {timeOptions.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </Field>
                        <div className="text-danger small">
                          <ErrorMessage name="endTime" />
                        </div>
                      </Col>
                    </Row>

                    {/* Location */}
                    <div className="mb-3">
                      <label htmlFor="location" className="form-label">
                        Location
                      </label>
                      <Field
                        id="location"
                        name="location"
                        className="form-control"
                        placeholder="e.g. Office boardroom, Zoom, Cafe"
                        maxLength={80}
                      />
                      <div className="text-danger small">
                        <ErrorMessage name="location" />
                      </div>
                    </div>

                    {/* Additional details / notes */}
                    <div className="mb-3">
                      <label htmlFor="details" className="form-label">
                        Additional details
                      </label>
                      <Field
                        as="textarea"
                        id="details"
                        name="details"
                        rows={3}
                        className="form-control"
                      />
                      <div className="text-danger small">
                        <ErrorMessage name="details" />
                      </div>
                    </div>

                    {/* Actions: Cancel and Save */}
                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={!(isValid && dirty)}
                      >
                        Save
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEvent;
