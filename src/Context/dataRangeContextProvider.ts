import React from 'react';

interface DateRangeContextType {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

// Create the context
const DateRangeContext = React.createContext<DateRangeContextType | undefined>(undefined);

export default DateRangeContext; // Export the context
