# Event Planner (React + Vite)

A responsive event planner web app built with React, Vite, React‑Bootstrap, React Router, Formik, Yup, and the Context API. Users can register, log in with a username, and manage events on a calendar dashboard.

***

## Features

### User accounts

- Register with name, email, username, and password (with validation).
- Log in using **username + password**.
- Protected routes for Dashboard and Add Event (redirects to Home if not logged in).
- Logout button on the dashboard, with a “You’re logged out” message on Home.

### Event management

- Add events with:
  - Name
  - Date (day, month, year)
  - Start and end time
  - Location
  - Additional details/description
- Events displayed in:
  - A monthly **calendar** view.
  - A per‑day **event list**.
- Edit events (including changing the date; event moves to the new date).
- Delete events from the list.
- All event operations use React state via the Context API and re‑render immediately.

### Navigation

- Fixed header at the top with:
  - App logo (SVG)
  - Links to Dashboard, Add Event, Help
- Uses React Router for client‑side navigation and protected routes.

### Help section

- “Help & support” page with clear guidance:
  - Navigating the app
  - Registering and logging in
  - Creating, editing, deleting events
  - Tips for organising events effectively
- Implemented with React‑Bootstrap `Accordion`.

### Responsive UI

- React‑Bootstrap grid and components for layout.
- Custom CSS for the calendar and dashboard layout.
- Works on desktop and mobile (calendar and event list stack on smaller screens).

### State management

- React Context for:
  - User data (login status, username, etc.).
  - Events array.
  - Editing state.
  - Simple auth flags (`loginRequired`, `logoutMessage`).

***

## Tech Stack

- **Core**: React, Vite
- **UI**: React‑Bootstrap, Bootstrap 5 CSS
- **Routing**: React Router
- **Forms & validation**: Formik + Yup
- **State**: React Context API

***

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn

### Installation

```bash
# clone the repo
git clone <your-repo-url>
cd <your-project-folder>

# install dependencies
npm install
# or
yarn install
```

### Running the app

```bash
npm run dev
# or
yarn dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

***

## Project Structure (key files)

- `src/main.jsx` – App entry point, wraps with `BrowserRouter` and `AppProvider`.
- `src/App.jsx` – Routes and protected route setup.
- `src/context/AppContext.jsx` – Context for user/auth state and events.
- `src/components/NavigationBar.jsx` – Fixed header with SVG logo and navigation.
- `src/components/Calendar.jsx` – Monthly calendar grid.
- `src/components/EventList.jsx` – Event list for the selected date.
- `src/pages/Home.jsx` – Login (username + password) and registration forms.
- `src/pages/Dashboard.jsx` – Calendar + event list, logout button.
- `src/pages/AddEvent.jsx` – Add/edit event form (Formik + Yup).
- `src/pages/Help.jsx` – Help & tips content.
- `src/utils/dateUtils.js` – Date formatting and calendar helpers.
- `src/index.css` – Global + calendar/dashboard styling.

***

## How to Use

### Register

1. On Home, click **Register**.
2. Fill in name, email, username, and password.
3. On success, you’re redirected to the dashboard.

### Log in

1. On Home, use the **login** form.
2. Enter your **username** and password.
3. If you try to access Dashboard/Add Event while logged out, you’ll be sent back here with an error message.

### Manage events

1. Go to **Add Event** to create a new event (name, date, times, location, details).
2. On **Dashboard**:
   - Use the calendar to pick a date.
   - View events for that day in the event list.
   - Click **Edit** to change an event (including moving it to a new date).
   - Click **Delete** to remove an event.

### Logout

1. On Dashboard, click **Logout**.
2. You’ll return to Home and see a “You’re logged out” info message.

***

## Notes / Future Improvements

Data currently lives in memory (it resets on page refresh).

Possible future enhancements:

- LocalStorage persistence.
- Real backend for user accounts and events.
- Searching and filtering events.
