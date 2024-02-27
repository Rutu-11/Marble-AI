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

// import Images from "../../assets/index.js";
import EditOnHover from "../../assets/StatusHover.svg";
import { TabView } from "./TabView";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "react-datepicker/dist/react-datepicker.css";

type IconProps = {
  id: string | number; // Assuming id is of type string or number
  open: string | number; // Assuming open is of type string or number
  onClick: () => void; // Assuming onClick is a function that doesn't return anything
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

type TStats = {
  dailyRevenue?: GetListResponse<IChartDatum>;
  dailyOrders?: GetListResponse<IChartDatum>;
  newCustomers?: GetListResponse<IChartDatum>;
  tabs?: TTab[];
};
type AccordionProps = {
  id: string | number; // Update type definition to accept both strings and numbers
  // Other props...
};

const Stats = ({ dailyRevenue, dailyOrders, newCustomers, tabs }: TStats) => {
  //   const { EditOnHover } = Images;
  const [open, setOpen] = React.useState(1);

  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date:any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date:any) => {
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
console.log('date', startDate,endDate)
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
          {isLoading ? (
            <SkeletonTheme baseColor="#e3e3e3" highlightColor="#878787">
              <p style={{ marginBottom: "5px" }}>
                <Skeleton width={"7vw"} height={"16vh"} />
              </p>
            </SkeletonTheme>
          ) : (
            <div className="w-[7%] h-[7.2rem] mt-2 ml-1 mx-auto flex items-center justify-center border bg-white">
              <Icon id={1} open={open} onClick={toggleAccordion} />
            </div>
          )}
        </div>

        <AccordionHeader
          //onClick={() => handleOpen(1)}
          title="Accordion Title"
          id="accordion-id"
          placeholder="your_placeholder_value"
        >
          <div className="flex border border-green-500 w-[90%] justify-end" >
          <div className="my-2 flex items-center mr-[4rem]">
            <label
              htmlFor="start_date"
              className="mr-2 text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              Start Date
            </label>
            <input
              id="start_date"
              type="date"
              className="appearance-none bg-gray-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:border-none"
              onChange={(e)=>handleStartDateChange(e.target.value)}
            />
          </div>

          <div className="my-2 flex items-center">
            <label
              htmlFor="start_date"
              className="mr-2 text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              End Date
            </label>
            <input
              id="start_date"
              type="date"
              className="appearance-none bg-gray-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:border-none"
              onChange={(e)=>handleEndDateChange(e.target.value)}
            />
          </div>
          </div>
        </AccordionHeader>
        <AccordionBody>
          {!isLoading && tabs ? (
            <TabView tabs={tabs} />
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
