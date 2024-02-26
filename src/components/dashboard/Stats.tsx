import React, { useState } from "react";
import { KpiCard } from "./KpiCard";
import { IChartDatum } from "../../interfaces";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { GetListResponse } from "@refinedev/core";

import Images from "../../assets/index.js";

type TStats = {
  dailyRevenue?: GetListResponse<IChartDatum>;
  dailyOrders?: GetListResponse<IChartDatum>;
  newCustomers?: GetListResponse<IChartDatum>;
};

const Stats = ({ dailyRevenue, dailyOrders, newCustomers }: TStats) => {
  const { EditOnHover } = Images;
 

  return (
    <div className="w-full mx-auto mb-4 flex flex-col justify-center items-stretch md:flex-row md:justify-between drop-shadow-md border border-red-500 ">
      <div className="w-full mx-auto md:flex-1 md:mr-2">
        <KpiCard
          title="Online Store Sessions"
          data={dailyRevenue}
          formatTotal={(value: number | string) => `$ ${value}`}
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
            stroke: "rgb(76, 175, 80)",
            fill: "rgba(76, 175, 80, 0.2)",
          }}
        />
      </div>
    </div>
  );
};

export default Stats;
