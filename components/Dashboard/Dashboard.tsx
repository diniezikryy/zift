import { collection, doc, DocumentData, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

const Dashboard = ({ user_id, dashboard_id, columnsIds }) => {
  console.log(
    `This is the user ${user_id} dashboard page of id ${dashboard_id}.`
  );

  return (
    <div>
      <div className="flex">
        {columnsIds.map((columnId) => {
          return <div className="border">{columnId}</div>;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
