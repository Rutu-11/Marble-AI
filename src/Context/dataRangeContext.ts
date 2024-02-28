// import React, { createContext, useState, useContext, ReactNode } from 'react';

// interface DateRangeContextType {
//   startDate: Date | null;
//   setStartDate: (date: Date | null) => void;
//   endDate: Date | null;
//   setEndDate: (date: Date | null) => void;
// }

// const initialContext: DateRangeContextType = {
//   startDate: null,
//   setStartDate: () => {},
//   endDate: null,
//   setEndDate: () => {},
// };

// export const DateRangeContext = createContext<DateRangeContextType>(initialContext);

// export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);

//   return (
//     <DateRangeContext.Provider value={{ startDate, setStartDate, endDate, setEndDate }}>
//       {children}
//     </DateRangeContext.Provider>
//   );
// };
