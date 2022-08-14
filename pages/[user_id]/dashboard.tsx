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

const DashboardPage = ({ boards }) => {
  return (
    <ProtectedRoute>
      <div className="container flex py-2 mx-auto">
        <div className="px-12 py-24 mx-auto mt-24 overflow-y-hidden text-gray-600">
          {boards.map((board) => {
            return <h2>{board.name}</h2>;
          })}
          <h2 className="text-2xl font-semibold"></h2>
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

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.user_id;
  const colRef = collection(db, "users", id, "boards");
  const colSnap = await getDocs(colRef);

  return {
    props: {
      boards: colSnap.docs.map((doc) => doc.data()),
    },
  };
};

export default DashboardPage;
