import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../utils/firebase";
import KanbanLogo from "../../../assets/logo-dark.svg";
import HideSidebar from "../../../assets/icon-hide-sidebar.svg";

interface SidebarProps {
  toggleCollapse: boolean;
  handleSidebarToggle: any;
  boards: [];
}

const Sidebar = ({
  toggleCollapse,
  handleSidebarToggle,
  boards,
}: SidebarProps) => {
  // const [selectedBoard, setSelectedBoard] = useState<string>("Platform Launch");
  const boardsArr = ["Platform Launch", "Marketing Plan", "Roadmap"];

  return (
    <div
      className={`flex flex-col h-screen ${
        toggleCollapse
          ? "w-0 opacity-0"
          : "opacity-100 w-80 p-8 shadow-2xl bg-white"
      }`}
      style={{
        transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s",
      }}
    >
      <div className="flex flex-col mb-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 pl-1 ">
            <span
              className={`mt-2 text-lg font-medium ${
                toggleCollapse ? "hidden" : ""
              }`}
            >
              <KanbanLogo />
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <h3 className="mb-5 text-xs font-semibold tracking-widest uppercase text-grey-light-tertiary">
          All boards ({boardsArr.length})
        </h3>

        <div className="">
          {boardsArr.map((board) => {
            return (
              <a
                href="#"
                className="group flex justify-between flex-row items-center text-grey-light-tertiary py-3.5 hover:text-purple-primary hover:rounded-lg"
              >
                {board}
                <span className="">
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:fill-purple-primary fill-grey-light-tertiary"
                  >
                    <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                  </svg>
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center w-full bg-grey-light-primary p-3.5 rounded-lg mt-auto">
        <svg
          width="19"
          height="19"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-6"
        >
          <path
            d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z"
            fill="#828FA3"
          />
        </svg>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            id="default-toggle"
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-purple-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <svg
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-6"
        >
          <path
            d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z"
            fill="#828FA3"
          />
        </svg>
      </div>

      <div className="flex flex-row w-full mt-6">
        <button
          className="flex flex-row items-center mr-4"
          onClick={() => handleSidebarToggle()}
        >
          <HideSidebar />

          <h3 className="ml-4 text-xs font-bold leading-3 text-grey-light-tertiary">
            Hide Sidebar
          </h3>
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const colRef = collection(db, "users", "RjR2ZxyZg7h2qiIkiY7K0pcETp92");
  const colSnap = await getDocs(colRef);

  colSnap.docs.map((doc) => {
    console.log("Docs: ");
    console.log(doc.data());
  });
}

export default Sidebar;
