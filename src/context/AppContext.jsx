import { createContext, useContext, useMemo, useState } from "react";

/**
 * Global application context
 * - Shares user/auth state and event data across pages
 * - Avoids prop-drilling between components
 */
const AppContext = createContext();

/**
 * AppProvider:
 * Wraps the app and provides shared state + actions via Context.
 */
export const AppProvider = ({ children }) => {
  // Currently logged-in user (or null if not logged in)
  const [user, setUser] = useState(null);

  // List of events for the current user
  // Shape: { id, name, date, startTime, endTime, details, location }
  const [events, setEvents] = useState([]);

  // Event currently being edited (used to prefill the Edit form)
  const [editingEvent, setEditingEvent] = useState(null);

  // Flag to show "You must log in" message on Home when a protected route is blocked
  const [loginRequired, setLoginRequired] = useState(false);

  // Flag to show "You're logged out" info message on Home after logout
  const [logoutMessage, setLogoutMessage] = useState(false);

  /**
   * Log a user in:
   * - Set user object
   * - Clear any "login required" or "logged out" messages
   */
  const login = (userData) => {
    setUser(userData);
    setLoginRequired(false);
    setLogoutMessage(false);
  };

  /**
   * Log a user out:
   * - Clear user and events
   * - Show the "You're logged out" message on Home
   */
  const logout = () => {
    setUser(null);
    setEvents([]);
    setLogoutMessage(true);
  };

  /**
   * Add a new event:
   * - Generate an id if one is not supplied
   * - Append to the events array
   */
  const addEvent = (eventData) => {
    setEvents((prev) => [
      ...prev,
      { ...eventData, id: eventData.id ?? crypto.randomUUID() },
    ]);
  };

  /**
   * Update an existing event:
   * - Replace the event with matching id using the updated data
   */
  const updateEvent = (id, updatedData) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, ...updatedData, id } : ev))
    );
  };

  /**
   * Delete an event:
   * - Remove the event with the given id from the events array
   */
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  /**
   * Memoised context value:
   * - Prevents unnecessary re-renders of consumers when unrelated state changes
   */
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      editingEvent,
      setEditingEvent,
      loginRequired,
      setLoginRequired,
      logoutMessage,
      setLogoutMessage,
    }),
    [user, events, editingEvent, loginRequired, logoutMessage]
  );

  // Provide the shared state/actions to all children
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Convenience hook:
 * - Use this instead of useContext(AppContext) directly
 */
export const useAppContext = () => useContext(AppContext);
