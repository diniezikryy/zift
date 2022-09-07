import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

interface ColumnProps {
  column_id?: string;
  user_id?: string;
  dashboard_id?: string;
}

const Column = ({ column_id, user_id, dashboard_id }: ColumnProps) => {
  const [columnName, setColumnName] = useState<string>("");
  const [columnTasks, setColumnTasks] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch column name from Firestore
    const nameRef = doc(
      db,
      `users/${user_id}/boards/${dashboard_id}/columns/${column_id}`
    );
    getDoc(nameRef).then((documentSnapshot) => {
      setColumnName(documentSnapshot?.data()?.name);
    });

    // Fetch tasks from Firestore
    const tasksRef = collection(
      db,
      `users/${user_id}/boards/${dashboard_id}/columns/${column_id}/tasks`
    );
    getDocs(tasksRef)
      .then((taskSnapshot) => {
        const tasks: DocumentData[] = [];
        taskSnapshot.docs.forEach((task) => {
          tasks.push({
            id: task.id,
            description: task.data().description,
            status: task.data().status,
            title: task.data().title,
          });
        });
        setColumnTasks(tasks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="border">
      <h1>{columnName}</h1>
      <ol>
        {columnTasks.map((task) => {
          return <li>{task.title}</li>;
        })}
      </ol>
    </div>
  );
};

export default Column;
