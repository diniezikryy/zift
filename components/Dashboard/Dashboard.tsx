import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full m-auto bg-grey-light-primary">
      <div className="flex flex-col items-center m-auto w-fit">
        <h2 className="mb-8 text-lg font-semibold text-grey-light-tertiary">
          This board is empty. Create a new column to get started.
        </h2>
        <button className="px-6 py-3 text-sm text-white rounded-full bg-purple-primary w-fit">
          + Add New Column
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
