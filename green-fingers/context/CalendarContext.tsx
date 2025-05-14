import { DayOfWeek } from "@/constants/days";
import React, { createContext, ReactNode, useContext } from "react";


interface CalendarContextProps {
  wateringDay: DayOfWeek;
  setWateringDay: React.Dispatch<React.SetStateAction<DayOfWeek>>;
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
  children
}) => {
  const [wateringDay, setWateringDay] = React.useState<DayOfWeek>("Monday");


  return (
    <CalendarContext.Provider
      value={{
        wateringDay,
        setWateringDay,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
