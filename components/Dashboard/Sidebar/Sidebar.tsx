import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../utils/firebase";
import KanbanLogo from "../../../assets/logo-dark.svg";
import HideSidebar from "../../../assets/icon-hide-sidebar.svg";
import BoardIcon from "../../../assets/icon-board.svg";

interface SidebarProps {}

const Sidebar = ({ toggleCollapse, handleSidebarToggle, boards }) => {
  const [selectedBoard, setSelectedBoard] = useState("Platform Launch");
  const boardsArr = ["Platform Launch", "Marketing Plan", "Roadmap"];

  return (
    <div
      className={`relative flex flex-col h-screen bg-white w-80 p-6 ${
        toggleCollapse ? "hidden" : "w-80"
      }`}
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
        <h3 className="pl-8 mb-5">All boards</h3>
        {boardsArr.map((board) => {
          return (
            <a
              href="#"
              className="flex flex-row items-center py-3.5 px-8 hover:bg-purple-primary"
            >
              <span className="mr-4">
                <BoardIcon />
              </span>
              {board}
            </a>
          );
        })}
      </div>

      <div className="flex flex-row w-full mt-auto">
        <button
          className="flex flex-row items-center mr-4"
          onClick={handleSidebarToggle}
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
