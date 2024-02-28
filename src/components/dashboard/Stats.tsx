import React, { useEffect, useState } from "react";
import { KpiCard } from "./KpiCard";
import { IChartDatum, TTab } from "../../interfaces";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { GetListResponse } from "@refinedev/core";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import EditOnHover from "../../assets/StatusHover.svg";
import { TabView } from "./TabView";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "react-datepicker/dist/react-datepicker.css";
import { RevenueData, RevenueDatum, DataItem } from "../../interfaces";
import DB from "../../DB.json";

type IconProps = {
  id: string | number; // Assuming id is of type string or number
  open: string | number; // Assuming open is of type string or number
  onClick: () => void; // Assuming onClick is a function that doesn't return anything
};

type TStats = {
  dailyRevenue?: GetListResponse<IChartDatum>;
  dailyOrders?: GetListResponse<IChartDatum>;
  newCustomers?: GetListResponse<IChartDatum>;
  filteredRevenueData: RevenueData[]; // Add filteredRevenueData prop here
  setFilteredRevenueData: React.Dispatch<React.SetStateAction<RevenueData[]>>;
  tabs?: TTab[];
};

type AccordionProps = {
  id: string | number; // Update type definition to accept both strings and numbers
  // Other props...
};

function Icon({ id, open, onClick }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-8 w-8 transition-transform`}
      style={{ cursor: "pointer", fontWeight: "bold" }}
      onClick={onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const Stats: React.FC<TStats> = ({
  dailyRevenue,
  dailyOrders,
  newCustomers,
  filteredRevenueData,
  setFilteredRevenueData,
  tabs,
}) => {
  const [open, setOpen] = React.useState(1);

  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const [startDate, setStartDate] = useState("2024-02-28");
  const [endDate, setEndDate] = useState("2024-11-28");
  const [Tabs, setTabs] = useState(tabs);
  const [revenueData, setRevenueData] = useState<RevenueDatum[]>([]);

  useEffect(() => {
    setRevenueData(tabs ? tabs[0].content.props.data : []);
  }, [tabs]);

  const handleStartDateChange = (date: any) => {
    setStartDate((prevStartDate) => date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  useEffect(() => {
    // Simulating data fetching delay
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust this value according to your actual data fetching time

    return () => clearTimeout(timeout);
  }, []); // Run only on mount

  const handleOpen = (value: number | string) => {
    setOpen((prevOpen) =>
      prevOpen === value
        ? 0
        : typeof value === "number"
        ? value
        : parseInt(value, 10)
    );
  };

  const toggleAccordion = () => {
    setOpen(open === 1 ? 0 : 1); // Toggle to open if currently closed, or close if currently open
  };

  function formatDate(dateString: string): string {
    const dateObj = new Date(dateString);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const year = dateObj.getFullYear();
    return `${month} ${year}`;
  }

  const filteredRevenueData1 = DB.filter((item) => {
    const currentDate = new Date(item.name);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Extract month and year from currentDate, startDateObj, and endDateObj
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const startMonth = startDateObj.getMonth();
    const startYear = startDateObj.getFullYear();
    const endMonth = endDateObj.getMonth();
    const endYear = endDateObj.getFullYear();

    // Compare only month and year
    return (
      (currentYear > startYear ||
        (currentYear === startYear && currentMonth >= startMonth)) &&
      (currentYear < endYear ||
        (currentYear === endYear && currentMonth <= endMonth))
    );
  });

  useEffect(() => {
    setFilteredRevenueData(filteredRevenueData1);
    if (Tabs && Tabs[0].content) {
      const newData = [...Tabs[0].content.props.data]; // Clone the data array
      newData.splice(0, newData.length, ...revenueData); // Replace the content of newData with revenueData
      setTabs((prevTabs) => {
        if (prevTabs) {
          return [
            {
              ...prevTabs[0],
              content: {
                ...prevTabs[0].content,
                props: { ...prevTabs[0].content.props, data: newData },
              },
            },
            ...prevTabs.slice(1),
          ];
        }
        return prevTabs; // Return undefined if prevTabs is undefined
      });
    }
  }, [startDate, endDate]);

  return (
    <>
      <Accordion open={open === 1} id="1" placeholder="your_placeholder_value">
        <div className="w-full mx-auto mb-4 flex flex-col justify-center items-stretch md:flex-row md:justify-between drop-shadow-md">
          <div className="w-full mx-auto md:flex-1 mr-2 ">
            <KpiCard
              title="Online Store Sessions"
              data={dailyRevenue}
              icon={EditOnHover}
              colors={{
                stroke: "rgb(54, 162, 235)",
                fill: "rgba(54, 162, 235, 0.2)",
              }}
            />
          </div>
          <div className="w-full mx-auto md:flex-1">
            <KpiCard
              title="Net Return Value"
              data={dailyOrders}
              icon={EditOnHover}
              colors={{
                stroke: "rgb(255, 159, 64)",
                fill: "rgba(255, 159, 64, 0.2)",
              }}
            />
          </div>
          <div className="w-full mx-auto md:flex-1 md:ml-2">
            <KpiCard
              title="Total Orders"
              data={newCustomers}
              icon={EditOnHover}
              colors={{
                stroke: "rgb(76, 175, 80)",
                fill: "rgba(76, 175, 80, 0.2)",
              }}
            />
          </div>
          <div className="w-full mx-auto md:flex-1 md:ml-2">
            <KpiCard
              title="Conversion Rate"
              data={newCustomers}
              icon={EditOnHover}
              colors={{
                stroke: "hsl(339,82%,51%)",
                fill: "hsl(339,82%,31%)",
              }}
            />
          </div>
          <div className="w-[100%] md:w-[10%] lg:w-[10%] flex h-[7.3rem] mt-2 items-center justify-center border bg-white">
            {isLoading ? (
              <SkeletonTheme baseColor="#e3e3e3" highlightColor="#878787">
                <Skeleton width={122} height={118} />{" "}
                {/* Adjust dimensions as needed */}
              </SkeletonTheme>
            ) : (
              <div className="w-full md:w-10 h-32 md:h-5 lg:h-5 lg:w-10 mx-auto flex items-center justify-center">
                <Icon id={1} open={open} onClick={toggleAccordion} />
              </div>
            )}
          </div>
        </div>

        <AccordionHeader
          title="Accordion Title"
          id="accordion-id"
          placeholder="your_placeholder_value"
        >
          {isLoading ? (
  <SkeletonTheme baseColor="#e3e3e3" highlightColor="#878787">
    <Skeleton width={"100vw"} height={"10vh"} /> {/* Adjust dimensions as needed */}
  </SkeletonTheme>
) : (
<div className="flex flex-col md:flex-row justify-between items-center border-green-500 md:w-full">
  <p className="text-xs text-center md:text-left md:mr-8">
    <b>Note: </b> Since it's mock data, you can pick the date from{" "}
    <b>July 2023</b> to <b>Dec 2024</b> only for better user experience{" "}
  </p>
  <div className="my-2 flex flex-col md:flex-row items-center md:mr-4">
    <label
      htmlFor="start_date"
      className="mr-2 md:mr-4 text-sm font-medium text-gray-700 whitespace-nowrap"
    >
      Start Date
    </label>
    <input
      id="start_date"
      type="date"
      className="appearance-none bg-gray-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:border-none"
      onChange={(e) => handleStartDateChange(e.target.value)}
    />
  </div>
  <div className="my-2 flex flex-col md:flex-row items-center">
    <label
      htmlFor="end_date"
      className="mr-2 md:mr-4 text-sm font-medium text-gray-700 whitespace-nowrap"
    >
      End Date
    </label>
    <input
      id="end_date"
      type="date"
      className="appearance-none bg-gray-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:border-none"
      onChange={(e) => handleEndDateChange(e.target.value)}
    />
  </div>
</div>

)}

        
        </AccordionHeader>
        <AccordionBody>
          {!isLoading && Tabs ? (
            <TabView tabs={Tabs} />
          ) : (
            <SkeletonTheme baseColor="#e3e3e3" highlightColor="#878787">
              <p style={{ marginBottom: "5px" }}>
                <Skeleton width={"100vw"} height={"70vh"} />
              </p>
            </SkeletonTheme>
          )}
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default Stats;
