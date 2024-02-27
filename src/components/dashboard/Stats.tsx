import React, { useState } from "react";
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
import EditOnHover from "../../assets/StatusHover.svg"
import { TabView } from "./TabView";

function Icon({ id, open ,onClick}) {
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
      style={{ cursor: 'pointer',fontWeight: 'bold' }}
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
  tabs? : TTab[];
};


const Stats = ({ dailyRevenue, dailyOrders, newCustomers,tabs }: TStats) => {
//   const { EditOnHover } = Images;
const [open, setOpen] = React.useState(1);

const handleOpen = (value) => setOpen(open === value ? 0 : value);
const toggleAccordion = () => {
  setOpen(open === 1 ? 0 : 1); // Toggle to open if currently closed, or close if currently open
};

  return (
    <>
    <Accordion
        open={open === 1}
        // icon={<Icon id={1} open={open} />}
        // resource="your_resource_name"
        id={1}
        // placeholder="your_placeholder_value"
      >
    <div className="w-full mx-auto mb-4 flex flex-col justify-center items-stretch md:flex-row md:justify-between drop-shadow-md border border-red-500 ">
  <div className="w-full mx-auto md:flex-1 md:mr-2  bg-[#f1f1f1] border border-green-400">
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
  <div className="w-[7%]  mx-auto flex items-center justify-center border bg-white border-blue-500">
    <Icon id={1} open={open} onClick={toggleAccordion} className="cursor-pointer text-center" />
  </div>
</div>


    
        <AccordionHeader onClick={() => handleOpen(1)}>
        </AccordionHeader>
        <AccordionBody>
          {/* hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh */}
          <TabView tabs={tabs} />
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default Stats;
