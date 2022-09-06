import { collection, doc, DocumentData, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import Column from "./Column";

const Dashboard = ({ user_id, dashboard_id, columnsIds }) => {
  console.log(
    `This is the user ${user_id} dashboard page of id ${dashboard_id}.`
  );

  return (
    <div>
      <div className="flex">
        {columnsIds.map((columnId) => {
          return (
            <Column
              key={columnId}
              columnId={columnId}
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
