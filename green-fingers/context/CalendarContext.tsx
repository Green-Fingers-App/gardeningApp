import React, { createContext, ReactNode, useContext, useEffect } from "react";

type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface CalendarContextProps {
  wateringDay: DayOfWeek;
  setWateringDay: React.Dispatch<React.SetStateAction<DayOfWeek>>;
  days: DayOfWeek[];
}

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined
);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [wateringDay, setWateringDay] = React.useState<DayOfWeek>("Monday");

  const days: DayOfWeek[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <CalendarContext.Provider
      value={{
        wateringDay,
        setWateringDay,
        days,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
