import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import Help from "../../assets/Help.svg";
import Trend from "../../assets/Trend.svg";
import EditOnHover from "../../assets/StatusHover.svg";
import { AiFillCaretUp } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Simulating data fetching delay
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust this value according to your actual data fetching time

    return () => clearTimeout(timeout);
  }, []); // Run only on mount

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log("isModalOpen", isModalOpen);
  };

  const arr = [
    "Average Order value",
    "Conversion rate",
    "Gross Sales",
    "Net return value",
    "Store search conversion",
    "Return rate",
  ];
  console.log("icon", icon);
  return (
    <>
      {isLoading ? ( // Render loading skeleton if data is loading
        <div className="loading-skeleton stat my-2 py-4 flex-1 border-l-4 rounded">
          {/* Your loading skeleton UI here */}
          {/* <Skeleton  className="bg-[#d9d9d9] w-[" />
              <Skeleton width={40} /> */}
              Loading...
        </div>
      ) : (
        <>
          <div
            className={`stat my-2 py-4 flex-1 border-l-4 rounded bg-white hover:bg-[#f1f1f1] `}
            style={{ borderColor: colors?.stroke }}
            onMouseEnter={() => setShowEdit(!showEdit)}
            onMouseLeave={() => setShowEdit(!showEdit)}
          >
            <div className="title-icon-container flex items-center justify-between ">
              {" "}
              {/* Added container */}
              <div
                className="stat-title text-l font-bold text-black relative"
                onMouseEnter={toggleModal}
                onMouseLeave={toggleModal}
                style={{
                  marginBottom: "0.2em", // Add padding to create space between text and underline
                  textDecoration: "underline dotted",
                }}
              >
                {title}
                {/* <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" ></span> */}
              </div>
              {/* Title */}
              <div className="relative">
                <img
                  src={icon}
                  alt="edit icon"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  // className="flex items-center whitespace-nowrap rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                  // // type="button"
                  id="dropdownMenuButton1"
                  aria-expanded={isDropdownOpen}
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className={`ml-2 ${showEdit ? "" : "hidden"}`}
                />
                <ul
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className={`absolute z-[2000] float-left m-0  ${
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

            <div className="stat-value flex " style={{ color: colors?.stroke }}>
              {formatTotal(total ?? "...")}
              <div className="flex items-center ml-[0.2rem]">
                <AiFillCaretUp className="w-5 h-5" style={{ color: "black" }} />
                <span
                  className="mx-1 text-sm font-bold"
                  style={{ color: textColor }}
                >
                  {percent}
                </span>
              </div>
            </div>

            {/* <div className=".stat-desc my-2 ">
        <span className="mx-1 text-l font-bold" style={{ color: textColor }}>
          {percent}
        </span>
        since last week
      </div> */}
          </div>

          <div
            className={`my-2 w-[120%] mt-[-6rem] ml-6 px-1 py-4 flex-1 border-2 rounded bg-white relative z-10 ${
              isModalOpen ? "" : "hidden"
            }`}
          >
            <div className="font-bold">{title}</div>
            <div className="inline-block text-s">
              Your {title} volume, shown in sessions.
            </div>
          </div>
        </>
      )}
    </>
  );
};
