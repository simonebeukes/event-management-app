import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]); // { id, name, date, startTime, endTime, details, location }
  const [editingEvent, setEditingEvent] = useState(null);
  const [loginRequired, setLoginRequired] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setLoginRequired(false);
    setLogoutMessage(false);
  };

  const logout = () => {
    setUser(null);
    setEvents([]);
    setLogoutMessage(true);
  };

  const addEvent = (eventData) => {
    setEvents((prev) => [
      ...prev,
      { ...eventData, id: eventData.id ?? crypto.randomUUID() },
    ]);
  };

  const updateEvent = (id, updatedData) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, ...updatedData, id } : ev))
    );
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

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

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
