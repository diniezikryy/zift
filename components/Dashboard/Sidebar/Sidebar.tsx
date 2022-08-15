import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../utils/firebase";
import KanbanLogo from "../../../assets/logo-light.svg";
import HideSidebar from "../../../assets/icon-hide-sidebar.svg";
import ShowSidebar from "../../../assets/icon-show-sidebar.svg";

interface SidebarProps {}

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);

  return (
    <div
      className={`flex flex-col justify-between h-screen px-4 pt-8 pb}-4 bg-white w-80 ${
        toggleCollapse ? "w-20" : "w-80"
      }`}
    >
      <div className="flex flex-col">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4 pl-1">
            <KanbanLogo />
            <span
              className={`mt-2 text-lg font-medium ${
                toggleCollapse ? "hidden" : ""
              }`}
            >
              Kanban
            </span>
          </div>
          <button>
            <HideSidebar />
          </button>
        </div>
      </div>
      <div></div>
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
