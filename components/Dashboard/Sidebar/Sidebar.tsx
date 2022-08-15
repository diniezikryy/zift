import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../utils/firebase";
import KanbanLogo from "../../../assets/logo-dark.svg";
import HideSidebar from "../../../assets/icon-hide-sidebar.svg";

interface SidebarProps {}

const Sidebar = ({ toggleCollapse, handleSidebarToggle, boards }) => {
  return (
    <div
      className={`relative flex flex-col h-screen p-8 bg-white w-80 ${
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

      <div className="flex flex-col border-2">
        <h3>All boards</h3>
        {boards.map((board) => {
          return <h1>{board.name}</h1>;
        })}
      </div>

      <div className="flex flex-row w-full mt-auto">
        <button
          className="flex flex-row items-center mr-4"
          onClick={handleSidebarToggle}
        >
          <HideSidebar />

          <h3 className="ml-4 text-xs font-bold leading-5 text-grey-light-tertiary">
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
