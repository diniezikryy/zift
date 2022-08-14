import ProtectedRoute from "../../components/ProtectedRoute";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="container flex py-2 mx-auto">
        <div className="px-12 py-24 mx-auto mt-24 overflow-y-hidden text-gray-600">
          <h2 className="text-2xl font-semibold">Dashboard...</h2>
          <Sidebar />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export const getStaticPaths = async () => {
  const colRef = collection(db, "users");
  const colSnap = await getDocs(colRef);

  const paths = colSnap.docs.map((doc) => {
    console.log(doc.id.toString());
    return {
      params: { user_id: doc.id },
    };
  });

  console.log("paths: ", paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.user_id;
  // Use id to fetch user's tasks & boards
  // then return it as a prop
  const colRef = collection(db, "users", id, "boards");
  const colSnap = await getDocs(colRef);

  colSnap.docs.map((doc) => {
    console.log("Docs: ");
    console.log(doc.data());
  });

  return {
    props: { boards: [] },
  };
};

export default Dashboard;
