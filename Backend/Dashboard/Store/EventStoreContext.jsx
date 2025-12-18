import { createContext, useContext, useState, useCallback } from "react";

const EventStoreContext = createContext(undefined);

export function EventStoreProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [trash, setTrash] = useState([]);
  const [notification, setNotification] = useState(null);

  const addEvent = useCallback((event) => {
    setEvents((prev) => [
      ...prev,
      {
        ...event,
        id: Date.now(),
        uploaded: false,
        status: "draft",
        active: true,
      },
    ]);
  }, []);

  const getFilteredEvents = useCallback(
    () =>
      events.filter(
        (e) =>
          e.uploaded &&
          ["upcoming", "confirmed", "cancelled"].includes(e.status)
      ),
    [events]
  );

  const updateEvent = useCallback((id, updatedData) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedData } : e))
    );
  }, []);

  const uploadEvent = useCallback((id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              uploaded: true,
              status: "upcoming",
              active: true,
            }
          : e
      )
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

  const cancelEvent = useCallback((id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: "cancelled", active: true } : e
      )
    );
  }, []);

  const confirmEvent = useCallback((id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status: "confirmed",
              uploaded: true,
            }
          : e
      )
    );
  }, []);

  const triggerNotification = useCallback((msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const uploadedEvents = events.filter((e) => e.uploaded);
  const pendingEvents = events.filter((e) => !e.uploaded);

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
        getFilteredEvents,
        permanentDelete,
        cancelEvent,
        confirmEvent,
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
