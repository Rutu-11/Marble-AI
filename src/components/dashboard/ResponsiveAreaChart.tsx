import React, { useMemo, useState } from "react";
import Increment from "../../assets/Increment.svg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";
import EditOnHover from "../../assets/StatusHover.svg";
type TResponsiveAreaChartProps = {
  kpi: string;
  data: IChartDatum[];
  colors: {
    stroke: string;
    fill: string;
  };
};

interface DataItem {
  name: string | Date;
  uv: number;
  pv: number;
  amt: number;
}

type LegendItem = {
  color: string;
  value: string | number; // Assuming value is a string
};

type CustomLegendProps = {
  payload: LegendItem[];
};

const DB: DataItem[] = [
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

// Transform DataItem to LegendItem
const legendData: LegendItem[] = DB.map((item, index) => ({
  color: `color_${index}`, // You can provide a default color here
  value: item.uv, // Assuming 'uv' property is the value you want to use
}));

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const line1Color = payload[0].color;
    const line2Color = payload[1].color;

    const name1 = payload[0].payload.name;
    const [month1, year1] = name1.split(" ");
    const uvValue1 = payload[0].value;

    const name2 = payload[1].payload.name;
    const [month2, year2] = name2.split(" ");
    const uvValue2 = payload[1].value;

    // Calculate percentage change
    const percentageChange = ((uvValue1 - uvValue2) / uvValue2) * 100;
    return (
      <div className="w-[15rem] border border-gray-300 px-2 bg-[#f1f1f1]">
        <div className=" bg-[#f1f1f1] flex items-center">
          <span
            className={`mr-3 border-t-4 border-[#56a8de] text-center`}
            style={{ display: "inline-block", width: "20px" }}
          ></span>
          
          <span
            className=" border-l-10 border-blue "
            style={{ borderColor: payload[0]?.color }}
          >{`${month1} ${year1}  \u00A0\u00A0\u00A0 ${uvValue1}`}</span>
          <img src={Increment} alt="" className="mx-2 ml-3" />{" "}
          <span>{percentageChange.toFixed(0)}%</span>
        </div>
        <div className=" bg-[#f1f1f1] flex items-center mt-2">
        <span
            className={`mr-3 border-t-2 border-[#95bcc2] text-center border-dashed`}
            style={{ display: "inline-block", width: "20px" }}
          ></span>
          <span className="intro">{`${month2} ${
            Number(year2) - 1
          } \u00A0\u00A0\u00A0 ${uvValue2}`}</span>
        </div>
      </div>
    );
  }

  return null;
};

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <ul
      className="md:flex lg:flex block  justify-end"
      style={{ listStyleType: "none", padding: 0 }}
    >
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          className="flex items-center mb-[8px] bg-[#f1f1f1 ml-[50px] px-4 mt-4"
        >
          <div
            style={{
              borderLeft: `15px solid ${entry.color}`,
              height: "3px",
              marginRight: "8px",
            }}
          />
          <span> {formatDate(DB[0].name.toString())}</span> {`\u00A0`}
          <span> - {formatDate(DB[DB.length - 1].name.toString())}</span>
        </li>
      ))}
    </ul>
  );
};

export const ResponsiveAreaChart = ({
  kpi,
  data,
  colors,
}: TResponsiveAreaChartProps) => {
  const [opacity, setOpacity] = useState<{ [key: string]: number }>({
    uv: 1,
    pv: 1,
  });

  const handleMouseEnter = (payload: any, index: number) => {
    const { dataKey } = payload;
    setOpacity((prevOpacity) => ({ ...prevOpacity, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (payload: any, index: number) => {
    const { dataKey } = payload;
    setOpacity((prevOpacity) => ({ ...prevOpacity, [dataKey]: 1 }));
  };

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
  return (
    <ResponsiveContainer height={400}>

      <LineChart
        width={500}
        height={300}
        data={memoizedRevenueData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend payload={legendData} />} />

        <Line
          type="monotone"
          dataKey="pv"
          stroke="#56a8de"
          activeDot={{ r: 8 }}
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#95bcc2"
          strokeDasharray="5 4 5 7"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
