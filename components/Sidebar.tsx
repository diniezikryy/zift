import React from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
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
          <AiFillEnvironment
            className={`block float-left mr-2 text-4xl rounded cursor-pointer bg-purple-primary duration-500 ${
              !open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-2xl font-medium text-white origin-left ${
              !open && "scale-0"
            }`}
          >
            Tailwind
          </h1>
        </div>

        <div
          className={`flex items-center px-4 py-2 mt-6 rounded-md bg-light-white ${
            !open ? "px-2.5" : "px-4"
          }`}
        >
          <BsSearch
            className={`float-left text-lg text-white cursor-pointer ${
              open && "mr-2"
            }`}
          />
          <input
            type={"search"}
            placeholder="Search"
            className={`text-base bg-transparent w-full text-white focus:outline-none ${
              !open && "hidden"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
