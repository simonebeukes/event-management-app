import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import Help from "./pages/Help";
import { useAppContext } from "./context/AppContext";

const ProtectedRoute = ({ element }) => {
  const { user, setLoginRequired } = useAppContext();
  const location = useLocation();

  if (!user) {
    setLoginRequired(true);
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return element;
};

const App = () => {
  return (
    <>
      <NavigationBar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/add-event"
            element={<ProtectedRoute element={<AddEvent />} />}
          />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
