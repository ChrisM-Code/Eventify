import { createContext, useContext, useState, useCallback } from "react";

const EventStoreContext = createContext(undefined);

export function EventStoreProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [trash, setTrash] = useState([]);
  const [notification, setNotification] = useState(null);

  const addEvent = useCallback((event) => {
    setEvents((prev) => [
      ...prev,
      { ...event, id: Date.now(), uploaded: false },
    ]);
  }, []);

  const updateEvent = useCallback((id, updatedData) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedData } : e))
    );
  }, []);

  const uploadEvent = useCallback((id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, uploaded: true } : e))
    );
  }, []);

  const deleteEvent = useCallback((id) => {
    setEvents((prev) => {
      const removed = prev.find((e) => e.id === id);
      if (removed) setTrash((t) => [...t, removed]);
      return prev.filter((e) => e.id !== id);
    });
  }, []);

  const restoreEvent = useCallback((id) => {
    setTrash((prev) => {
      const item = prev.find((t) => t.id === id);
      if (!item) return prev;
      setEvents((e) => [...e, item]);
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  const permanentDelete = useCallback((id) => {
    setTrash((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const triggerNotification = useCallback((msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const uploadedEvents = events.filter((e) => e.uploaded);
  const pendingEvents = events.filter((e) => !e.uploaded);

  // debug: optional, remove in prod
  // console.log("EventStoreProvider mounted. events:", events.length);

  return (
    <EventStoreContext.Provider
      value={{
        events,
        trash,
        uploadedEvents,
        pendingEvents,
        addEvent,
        updateEvent,
        uploadEvent,
        deleteEvent,
        restoreEvent,
        permanentDelete,
        triggerNotification,
        notification,
      }}
    >
      {children}
    </EventStoreContext.Provider>
  );
}

export function useEventStore() {
  const ctx = useContext(EventStoreContext);
  if (ctx === undefined) {
    throw new Error(
      "useEventStore must be used within an EventStoreProvider. Did you forget to wrap your app with <EventStoreProvider>?"
    );
  }
  return ctx;
}
