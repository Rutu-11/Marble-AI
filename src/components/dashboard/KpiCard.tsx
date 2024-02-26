import React, { useState } from "react";
import Modal from "react-modal";
type TKpiCardProps = {
  title: string;
  data: any;
  icon: string;
//   toggleModal:any;
  colors: {
    stroke: string;
    fill: string;
  };
  formatTotal?: (value: number | string) => typeof value;
};

export const KpiCard = ({
  title,
  data,
  icon,
//   toggleModal,
  colors,
  formatTotal = (value) => value,
}: TKpiCardProps) => {
  const total = data?.data?.total;
  const trend = data?.data?.trend;
  const calc = Math.round((trend / total) * 100);
  const percent = total > trend ? `+ ${calc}%` : `- ${calc}%`;
  const textColor = total > trend ? "seagreen" : "crimson";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log("isModalOpen", isModalOpen);
  };

  return (
    <>
      <div
        className={`stat my-2 py-4 flex-1 border-l-4 rounded bg-[#f1f1f1] `}
        style={{ borderColor: colors?.stroke }}
      >
        <div
          className="title-icon-container flex items-center justify-between "
          onMouseEnter={toggleModal}
          onMouseLeave={toggleModal}
        >
          {" "}
          {/* Added container */}
          <div className="stat-title text-l">{title}</div> {/* Title */}
          <img src={icon} alt="" 
          className="ml-2"
        //   className={`ml-2 ${ isModalOpen ? "" : "hidden" }`} 
          /> 
        </div>
       
        <div className="stat-value" style={{ color: colors?.stroke }}>
          {formatTotal(total ?? "...")}
        </div>
       
        <div className=".stat-desc my-2 ">
          <span className="mx-1 text-l font-bold" style={{ color: textColor }}>
            {percent}
          </span>
          since last week
        </div>
      </div>

      <div
          className={`my-2 w-[120%] mt-[-6rem] ml-6 px-1 py-4 flex-1 border-2 rounded bg-[#f1f1f1] relative z-10 ${
            isModalOpen ? "" : "hidden"
          }`}
        >
          <div className="font-bold">{title}</div>
          <div className="inline-block text-s">
            Your {title} volume, shown in sessions.
          </div>
        </div>
    </>
  );
};
