import ProtectedRoute from "../components/ProtectedRoute";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    const docRef = doc(db, "users", "RjR2ZxyZg7h2qiIkiY7K0pcETp92");
    const docSnap = await getDoc(docRef);

    const colRef = collection(
      db,
      "users",
      "RjR2ZxyZg7h2qiIkiY7K0pcETp92",
      "boards"
    );
    const colSnap = await getDocs(colRef);

    if (docSnap.exists()) {
      console.log("Document data: ", docSnap.data());
    } else {
      console.log("No such document");
    }

    colSnap.docs.map((doc) => {
      console.log("Docs: ");
      console.log(doc.data());
    });

    const columns = query(collectionGroup(db, "tasks"));
    const qSnapshot = await getDocs(columns);
    qSnapshot.forEach((doc) => {
      console.log(doc.data());
    });

    return docSnap.data();
  };

  fetchData();

  return (
    <ProtectedRoute>
      <div className="container flex py-2 mx-auto">
        <div className="px-12 py-24 mx-auto mt-24 overflow-y-hidden text-gray-600">
          <h2 className="text-2xl font-semibold">Dashboard...</h2>
          <h3 className="text-xl font-semibold"></h3>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
