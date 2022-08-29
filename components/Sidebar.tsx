import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex ">
      <div
        onClick={() => setOpen(!open)}
        className={`relative h-screen p-5 pt-8 bg-dark-purple duration-300 ${
          open ? "w-72" : "w-20"
        }`}
      >
        <BsArrowLeftShort
          className={`absolute text-3xl bg-white border rounded-full cursor-pointer text-dark-purple -right-3 top-9 border-dark-purple ${
            !open && "rotate-180"
          }`}
        />
        <div className="inline-flex">
          <AiFillEnvironment className="block float-left mr-2 text-4xl rounded cursor-pointer bg-purple-primary" />
          <h1
            className={`text-2xl font-medium text-white origin-left ${
              !open && "scale-0"
            }`}
          >
            Tailwind
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
