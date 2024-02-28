import React, { useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { TabView } from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab,RevenueData } from "../../interfaces";

interface DataItem {
  name: string | Date;
  uv: number;
  pv: number;
  amt: number;
}

// interface RevenueData {
//   name:string;
//   uv:number;
//   pv:number;
//   amt:number
// }
interface Props {
  filteredRevenueData: RevenueData[];
  setFilteredRevenueData: React.Dispatch<React.SetStateAction<RevenueData[]>>;
}

const DB: DataItem[] = [
  {
    name: new Date(2022, 9, 1),
    uv: 5000,
    pv: 3400,
    amt: 2400,
  },
  {
    name: new Date(2022, 11, 1),
    uv: 6000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: new Date(2023, 1, 1),
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: new Date(2023, 3, 1),
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: new Date(2023, 5, 1),
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: new Date(2023, 7, 1),
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: new Date(2023, 9, 1),
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: new Date(2023, 11, 1),
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: new Date(2024, 1, 1),
    uv: 6490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: new Date(2024, 3, 1),
    uv: 3490,
    pv: 9300,
    amt: 2100,
  },
  {
    name: new Date(2024, 5, 1),
    uv: 3490,
    pv: 5300,
    amt: 2100,
  },
  {
    name: new Date(2024, 7, 1),
    uv: 5490,
    pv: 9300,
    amt: 2100,
  },
  {
    name: new Date(2024, 9, 1),
    uv: 3490,
    pv: 7300,
    amt: 2100,
  },
  {
    name: new Date(2024, 11, 1),
    uv: 3490,
    pv: 5300,
    amt: 2100,
  },
  {
    name: new Date(2025, 1, 1),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// const DB = {
//   data: {
//     data: [
//       {
//         name: new Date(2023, 9, 1),
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//       },
//       {
//         name: new Date(2022, 11, 1),
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//       },
//       {
//         name: new Date(2023, 1, 1),
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//       },
//       {
//         name: new Date(2023, 3, 1),
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//       },
//       {
//         name: new Date(2023, 5, 1),
//         uv: 2000,
//         pv: 9800,
//         amt: 2290,
//       },
//       {
//         name: new Date(2023, 7, 1),
//         uv: 2780,
//         pv: 3908,
//         amt: 2000,
//       },
//       {
//         name: new Date(2023, 9, 1),
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//       },
//       {
//         name: new Date(2023, 11, 1),
//         uv: 2390,
//         pv: 3800,
//         amt: 2500,
//       },
//       {
//         name: new Date(2024, 1, 1),
//         uv: 6490,
//         pv: 4300,
//         amt: 2100,
//       },
//       {
//         name: new Date(2024, 3, 1),
//         uv: 3490,
//         pv: 9300,
//         amt: 2100,
//       },
//       {
//         name: new Date(2024, 5, 1),
//         uv: 3490,
//         pv: 5300,
//         amt: 2100,
//       },
//       {
//         name: new Date(2024, 7, 1),
//         uv: 5490,
//         pv: 9300,
//         amt: 2100,
//       },
//       {
//         name: new Date(2024, 9, 1),
//         uv: 3490,
//         pv: 7300,
//         amt: 2100,
//       },
//       {
//         name: new Date(2024, 11, 1),
//         uv: 3490,
//         pv: 5300,
//         amt: 2100,
//       },
//       {
//         name: new Date(2025, 1, 1),
//         uv: 3490,
//         pv: 4300,
//         amt: 2100,
//       },
//     ],
//     trend: 80,
//     total: 5596,
//   },
// };



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
  const [filteredRevenueData, setFilteredRevenueData] = useState<RevenueData[]>([]);
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

  const useMemoizedChartData = (d: DataItem[] | undefined) => {
    return useMemo(() => {
      return d?.map((item: DataItem) => ({
        name:
          typeof item.name === "string"
            ? item.name
            : new Intl.DateTimeFormat("en-US", {
                month: "short",
                year: "numeric",
              }).format(item.name),
        uv: item?.uv,
        pv: item?.pv,
        amt: item?.amt,
      }));
    }, [d]);
  };
  

  const memoizedRevenueData = useMemoizedChartData(DB);
  // const memoizedOrdersData = useMemoizedChartData(dailyOrders);
  // const memoizedNewCustomersData = useMemoizedChartData(newCustomers);

  // console.log('memoizedRevenueData',memoizedRevenueData)
  const tabs: TTab[] = [
    {
      id: 1,
      label: "Daily Revenue",
      content: (
        <ResponsiveAreaChart
          kpi="Daily revenue"
      data={filteredRevenueData}
      // data={memoizedRevenueData||[]}
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
        filteredRevenueData={filteredRevenueData} 
        setFilteredRevenueData={setFilteredRevenueData} 
        tabs={tabs}
      />

     
      <RecentSales />
    </>
  );
};
