import React, { useMemo } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { TabView } from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab } from "../../interfaces";


const DB = {
  data: {
    data: [
      {
        date: "2023-12-23T00:00:00.000Z",
        value: 5096,
      },
      {
        date: "2024-02-16T00:00:00.000Z",
        value: 8128,
      },
      {
        date: "2024-04-17T00:00:00.000Z",
        value: 6254,
      },
      {
        date: "2024-06-18T00:00:00.000Z",
        value: 6076,
      },
      {
        date: "2024-08-19T00:00:00.000Z",
        value: 17962,
      },
      {
        date: "2024-10-20T00:00:00.000Z",
        value: 9622,
      },
      {
        date: "2024-12-21T00:00:00.000Z",
        value: 15668,
      },
      {
        date: "2025-02-22T00:00:00.000Z",
        value: 18872,
      },
    ],
    trend: 80,
    total: 5596,
  },
};
const filters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs()?.subtract(7, "days")?.startOf("day"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().startOf("day"),
  },
];



export const Dashboard: React.FC = () => {

  const { data: dailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
    filters,
  });

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters,
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters,
  });

   const useMemoizedChartData = (d: any) => {
    console.log("d", d);
    return useMemo(() => {
      return d?.data?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          // day: "numeric",
        }).format(new Date(item.date)),
        value: item?.value,
      }));
    }, [d]);
  };

  const memoizedRevenueData = useMemoizedChartData(DB);
  // const memoizedOrdersData = useMemoizedChartData(dailyOrders);
  // const memoizedNewCustomersData = useMemoizedChartData(newCustomers);

  const tabs: TTab[] = [
    {
      id: 1,
      label: "Daily Revenue",
      content: (
        <ResponsiveAreaChart
          kpi="Daily revenue"
          data={memoizedRevenueData}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
    // {
    //     id: 2,
    //     label: "Daily Orders",
    //     content: (
    //         <ResponsiveBarChart
    //             kpi="Daily orders"
    //             data={memoizedOrdersData}
    //             colors={{
    //                 stroke: "rgb(255, 159, 64)",
    //                 fill: "rgba(255, 159, 64, 0.7)",
    //             }}
    //         />
    //     ),
    // },
    // {
    //     id: 3,
    //     label: "New Customers",
    //     content: (
    //         <ResponsiveAreaChart
    //             kpi="New customers"
    //             data={memoizedNewCustomersData}
    //             colors={{
    //                 stroke: "rgb(76, 175, 80)",
    //                 fill: "rgba(54, 162, 235, 0.2)",
    //             }}
    //         />
    //     ),
    // },
  ];

  return (
    <>
      <Stats
        dailyRevenue={dailyRevenue}
        dailyOrders={dailyOrders}
        newCustomers={newCustomers}
        tabs={tabs}
      />

     
      {/* <RecentSales /> */}
    </>
  );
};
