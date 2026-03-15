import { Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

// Help & support page:
const Help = () => {
  return (
    <Container>
      {/* Page title and intro text */}
      <h1 className="mb-3">Help &amp; support</h1>
      <p className="mb-4">
        This page explains how to register, log in, navigate the app, and manage
        your events effectively.
      </p>
        
      {/* Accordion component, allows multiple sections to stay expanded at once */}
      <Accordion alwaysOpen>
        {/* Section 1: basic navigation*/}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Getting started &amp; navigation</Accordion.Header>
          <Accordion.Body>
            <h2 className="h5 mb-2">Navigation basics</h2>
            <p className="mb-2">
              The navigation bar at the top is always visible. Use it to jump
              between the main sections of the app.
            </p>
            <ul>
              <li>
                <strong>Dashboard</strong>: View your calendar and events for a
                selected date.
              </li>
              <li>
                <strong>Add Event</strong>: Create a new event with date, time,
                location, and details.
              </li>
              <li>
                <strong>Help</strong>: Read instructions and tips for using the
                app.
              </li>
            </ul>
            <p className="mb-0">
              If you try to open Dashboard or Add Event without logging in, you
              will be redirected back to the Home page and asked to log in.
            </p>
          </Accordion.Body>
        </Accordion.Item>

        {/* Section 2: how to register and log in */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Registering and logging into your account
          </Accordion.Header>
          <Accordion.Body>
            <h2 className="h5 mb-2">Creating an account</h2>
            <ol className="mb-3">
              <li>
                On the Home page, click <strong>Register</strong> to switch to
                the registration form.
              </li>
              <li>
                Enter your <strong>name</strong>, <strong>email</strong>,{" "}
                <strong>username</strong>, and <strong>password</strong>.
              </li>
              <li>
                Submit the form. If any fields are incorrect or empty, the app
                will show validation messages.
              </li>
              <li>
                After successful registration, you are automatically logged in
                and taken to your dashboard.
              </li>
            </ol>

            <h2 className="h5 mb-2">Logging in</h2>
            <ol className="mb-0">
              <li>
                On the Home page, make sure you are on the{" "}
                <strong>login</strong> form.
              </li>
              <li>
                Enter the username and password you used when registering, then
                click <strong>Log in</strong>.
              </li>
              <li>
                If you tried to access Dashboard or Add Event while logged out,
                you will see a red message reminding you to log in first.
              </li>
              <li>
                After logging in, you will be redirected to your dashboard.
              </li>
            </ol>
          </Accordion.Body>
        </Accordion.Item>

        {/* Section 3: creating, editing and deleting events */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Creating and editing events</Accordion.Header>
          <Accordion.Body>
            <h2 className="h5 mb-2">Adding a new event</h2>
            <ol className="mb-3">
              <li>
                Click <strong>Add Event</strong> in the navigation bar.
              </li>
              <li>
                Enter an <strong>event name</strong> that clearly describes what
                will happen.
              </li>
              <li>
                Select the <strong>day</strong>, <strong>month</strong>, and{" "}
                <strong>year</strong> for the event date.
              </li>
              <li>
                Choose the <strong>start time</strong> and{" "}
                <strong>end time</strong>.
              </li>
              <li>
                Fill in the <strong>location</strong>, such as an address,
                meeting room, or video link.
              </li>
              <li>
                Optionally, add extra <strong>details</strong> to store notes,
                agenda items, or reminders.
              </li>
              <li>
                Click <strong>Save</strong>. The new event will appear on the
                calendar and in the event list for that date.
              </li>
            </ol>

            <h2 className="h5 mb-2">Editing an existing event</h2>
            <ol className="mb-3">
              <li>
                On the Dashboard, select the date of the event from the
                calendar.
              </li>
              <li>
                In the events list on the right, click <strong>Edit</strong> on
                the event you want to change.
              </li>
              <li>
                Update any fields, including the date, time, or location.
              </li>
              <li>
                Click <strong>Save</strong>. The event will be updated and, if
                the date changed, it will move to the new date in the calendar.
              </li>
            </ol>

            <h2 className="h5 mb-2">Deleting an event</h2>
            <ol className="mb-0">
              <li>
                On the Dashboard, select the date with the event you want to
                delete.
              </li>
              <li>
                In the events list, click <strong>Delete</strong> on that event.
              </li>
              <li>
                Confirm when the app asks if you are sure. The event will be
                removed from the list and calendar.
              </li>
            </ol>
          </Accordion.Body>
        </Accordion.Item>

        {/* Section 4: general tips for using the app */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Tips for organising events</Accordion.Header>
          <Accordion.Body>
            <ul className="mb-0">
              <li>
                Use clear, short event names so they are easy to scan in the
                calendar.
              </li>
              <li>
                Always fill in the location field so you know exactly where the
                event happens.
              </li>
              <li>
                Use the details field for agendas, preparation notes, or links
                to documents.
              </li>
              <li>
                Group related events on the same day (for example, meetings for
                a single project) to keep your schedule focused.
              </li>
              <li>
                Review your dashboard at the start of each day to understand
                which events are coming up.
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Help;
