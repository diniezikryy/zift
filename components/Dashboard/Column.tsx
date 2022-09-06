import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

const Column = ({ columnId, user_id, dashboard_id }) => {
  const [columnName, setColumnName] = useState("");
  const [columnTasks, setColumnTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch column name from Firestore
    const nameRef = doc(
      db,
      `users/${user_id}/boards/${dashboard_id}/columns/${columnId}`
    );
    getDoc(nameRef).then((documentSnapshot) => {
      setColumnName(documentSnapshot?.data()?.name);
    });

    // Fetch tasks from Firestore
    const tasksRef = collection(
      db,
      `users/${user_id}/boards/${dashboard_id}/columns/${columnId}/tasks`
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

  console.log(columnTasks);
  console.log(columnName);

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
