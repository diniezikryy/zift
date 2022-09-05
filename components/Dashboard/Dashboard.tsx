import { collection, doc, DocumentData, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

const Dashboard = ({ user_id, dashboard_id, columnsId, tasks }) => {
  console.log(
    `This is the user ${user_id} dashboard page of id ${dashboard_id}.`
  );
  console.log("columns + tasks ->", columnsId, tasks);

  const [columns, setColumns] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchedColumns: DocumentData[] = [];
    const columnsRef = collection(
      db,
      `users/${user_id}/boards/${dashboard_id}/columns`
    );
    getDocs(columnsRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        fetchedColumns.push(doc.data());
      });
    });
    setColumns(fetchedColumns);
  }, []);

  console.log(columns);

  return (
    <div>
      <div className="flex border">
        {columns.map((column) => {
          return <div>{column.name}</div>;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
