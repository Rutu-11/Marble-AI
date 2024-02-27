import React, { useMemo, useState } from "react";
// import {
//     ResponsiveContainer,
//     AreaChart,
//     CartesianGrid,
//     XAxis,
//     YAxis,
//     Tooltip,
//     Area,
// } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";
import EditOnHover from "../../assets/StatusHover.svg"
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

    return (
      <div className="w-[200px] border border-red-500">
        {/* <span className=" w-10" style={{ backgroundColor:"black" , width:"100px" }}>   66</span> */}
        <p
          className=" border-l-10 border-blue "
          style={{ borderColor: payload[0]?.color }}
        >{`${month1} ${year1}  \u00A0\u00A0\u00A0 ${uvValue1}`}</p>
        {/* <span className="line" style={{ backgroundColor: line2Color }}></span> */}
        <p className="intro">{`${month2} ${
          Number(year2) - 1
        } \u00A0\u00A0\u00A0 ${uvValue2}`}</p>
      </div>
    );
  }

  return null;
};

const CustomLegend = ({ payload }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      };
    return (
        <ul className="md:flex lg:flex block border border-red-500 justify-end" style={{ listStyleType: 'none', padding: 0 }}>
        {/* {payload.map((entry, index) => ( */}
          <li key={`item-0`} className="flex items-center mb-[8px] bg-[#f1f1f1 ml-[50px] px-4 mt-4" >
            <div style={{ borderLeft: `15px solid ${payload[0].color}`, height: '3px', marginRight: '8px' }} />
            {/* <span style={{ marginRight: '8px' }}>{entry.value}</span>  */}
            <span> {formatDate(DB[0].name) }</span> {`\u00A0`}
            <span> - {formatDate(DB[DB.length - 1].name)}</span>
          </li>
          <li key={`item-1`} className="flex items-center mb-[8px] bg-[#f1f1f1 ml-[50px] px-4 mt-4" >
            <div style={{ borderLeft: `15px solid ${payload[1].color}`, height: '3px', marginRight: '8px' }} />
            {/* <span style={{ marginRight: '8px' }}>{entry.value}</span>  */}
            <span> {formatDate(DB[0].name) }</span> {`\u00A0`}
            <span> - {formatDate(DB[DB.length - 1].name)}</span>
          </li>
        {/* ))} */}
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
    console.log("d", d);
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
  console.log("memoizedRevenueData memoizedRevenueData", memoizedRevenueData);
  return (
    <ResponsiveContainer height={400}>
      {/* <AreaChart
                data={data}
                height={400}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="0 0 0" />
                <XAxis
                    dataKey="date"
                    tickCount={data?.length ?? 0}
                    tick={{
                        stroke: "light-grey",
                        strokeWidth: 0.5,
                        fontSize: "12px",
                    }}
                />
                <YAxis
                    tickCount={13}
                    tick={{
                        stroke: "light-grey",
                        strokeWidth: 0.5,
                        fontSize: "12px",
                    }}
                    interval="preserveStartEnd"
                    domain={[0, "dataMax + 10"]}
                />
                <Tooltip
                    content={<ChartTooltip kpi={kpi} colors={colors} />}
                    wrapperStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        border: "0 solid #000",
                        borderRadius: "10px",
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke={colors?.stroke}
                    strokeWidth={3}
                    fill={colors?.fill}
                    dot={{
                        stroke: colors?.stroke,
                        strokeWidth: 3,
                    }}
                />
            </AreaChart> */}
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
        {/* <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} /> */}
        <Legend content={<CustomLegend />} />

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
