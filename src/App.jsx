import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import Help from "./pages/Help";
import { useAppContext } from "./context/AppContext";

/**
 * ProtectedRoute:
 * - Wraps a route element and only renders it if a user is logged in.
 * - If not logged in, redirects to Home and triggers a "login required" message.
 */
const ProtectedRoute = ({ element }) => {
  const { user, setLoginRequired } = useAppContext();
  const location = useLocation();

  // If no user is logged in, mark that login is required and redirect to Home.
  if (!user) {
    setLoginRequired(true);
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  // If the user is logged in, render the protected element.
  return element;
};

/**
 * App:
 * - Root component that defines the global layout and client-side routes.
 * - Renders the fixed navigation bar and the main routed content.
 */
const App = () => {
  return (
    <>
      {/* Fixed header / navigation visible on all pages */}
      <NavigationBar />

      {/* Main routed content area (spaced below the fixed navbar via CSS) */}
      <div className="app-content">
        <Routes>
          {/* Public home page (login + registration) */}
          <Route path="/" element={<Home />} />

          {/* Dashboard is protected: user must be logged in */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />

          {/* Add Event is protected: user must be logged in */}
          <Route
            path="/add-event"
            element={<ProtectedRoute element={<AddEvent />} />}
          />

          {/* Help page is public */}
          <Route path="/help" element={<Help />} />

          {/* Fallback: any unknown route redirects back to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
