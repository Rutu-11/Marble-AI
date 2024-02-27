import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import Help from "../../assets/Help.svg";
import Trend from "../../assets/Trend.svg";
import EditOnHover from "../../assets/StatusHover.svg";
import { AiFillCaretUp } from "react-icons/ai";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type TKpiCardProps = {
  title: string;
  data: any;
  icon: string;
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
  colors,
  formatTotal = (value) => value,
}: TKpiCardProps) => {
  const total = data?.data?.total;
  const trend = data?.data?.trend;
  const calc = Math.round((trend / total) * 100);
  const percent = total > trend ? `+ ${calc}%` : `- ${calc}%`;
  const textColor = total > trend ? "seagreen" : "crimson";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  const handleMouseEnter = (index: number) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const arr = [
    "Average Order value",
    "Conversion rate",
    "Gross Sales",
    "Net return value",
    "Store search conversion",
    "Return rate",
  ];
  return (
    <>
      {!total || !percent ? ( // Render loading skeleton if data is loading
        <SkeletonTheme baseColor="#e3e3e3" highlightColor="#878787">
          <p style={{ marginBottom: "5px" }}>
            <Skeleton width={150} height={32} />
          </p>
          <p>
            <Skeleton width={250} height={65} />
          </p>
        </SkeletonTheme>
      ) : (
        <>
          <div
            className={`stat my-2 py-6 flex-1 rounded bg-white hover:bg-[#e3e3e3]  `}
            // style={{ borderColor: colors?.stroke }}
            onMouseEnter={() => setShowEdit(!showEdit)}
            onMouseLeave={() => setShowEdit(!showEdit)}
          >
            <div className="title-icon-container flex items-center justify-between ">
              {" "}
              <div
                className="stat-title text-l font-bold text-black relative"
                onMouseEnter={toggleModal}
                onMouseLeave={toggleModal}
                style={{
                  marginBottom: "0.2em", // Add padding to create space between text and underline
                  textDecoration: "underline dashed",
                  textDecorationColor: "gray", // Add textDecorationColor property
                  textDecorationThickness: "0.1em", // Add textDecorationThickness property for space
                }}
              >
                {title}
              </div>
              <div className="relative">
                <img
                  src={icon}
                  alt="edit icon"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  id="dropdownMenuButton1"
                  aria-expanded={isDropdownOpen}
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className={`ml-2 ${showEdit ? "" : "hidden"}`}
                />
                <ul
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className={`absolute z-[100] float-left m-0  ${
                    isDropdownOpen ? "" : "hidden"
                  } list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block`}
                  aria-labelledby="dropdownMenuButton1"
                  data-te-dropdown-menu-ref
                >
                  {arr.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center px-4 w-[15rem]  hover:bg-neutral-200 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={Trend}
                        alt="Help Icon"
                        className="h-4 w-4 mr-2"
                      />
                      <a
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 "
                        href="#"
                        data-te-dropdown-item-ref
                      >
                        {item}
                      </a>
                      <img
                        src={Help}
                        alt="Trend Icon"
                        className={`h-4 w-4 ml-2 ${
                          hoveredItem === index ? "block" : "hidden"
                        }`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="stat-value flex " >
              {formatTotal(total ?? "...")}
              <div className="flex items-center ml-[0.2rem]">
                <AiFillCaretUp className="w-5 h-5" style={{ color: "black" }} />
                <span
                  className="mx-1 text-sm font-bold"
                  // style={{ color: textColor }}
                >
                  {percent}
                </span>
              </div>
            </div>

          </div>

          <div
            className={` w-[110%] mt-[-4.5rem] ml-6 px-1 py-2 flex-1 border-2 rounded bg-white relative z-1000 ${
              isModalOpen ? "" : "hidden"
            }`}
          >
            <div className="font-bold">{title}</div>
            <div className="inline-block text-[0.8rem]">
              Your {title} volume, shown in sessions.
            </div>
          </div>
        </>
      )}
    </>
  );
};
