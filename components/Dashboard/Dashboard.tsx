import { collection, doc, DocumentData, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import Column from "./Column";

interface DashboardProps {
  user_id?: string;
  dashboard_id?: string;
  columns_ids: string[];
}

const Dashboard = ({ user_id, dashboard_id, columns_ids }: DashboardProps) => {
  console.log(
    `This is the user ${user_id} dashboard page of id ${dashboard_id}.`
  );

  return (
    <div>
      <div className="flex">
        {columns_ids.map((column_id) => {
          return (
            <Column
              key={column_id}
              column_id={column_id}
              user_id={user_id}
              dashboard_id={dashboard_id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
