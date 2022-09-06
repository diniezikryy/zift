import {
  collection,
  collectionGroup,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Dashboard from "../../../components/Dashboard/Dashboard";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import ProtectedRoute from "../../../components/HOC/ProtectedRoute";
import { useAuthHook } from "../../../context/AuthContext";
import { db } from "../../../utils/firebase";

export const getStaticPaths = async () => {
  const paths: object[] = [];
  const boardsId: string[] = [];

  const colRef = collection(db, "users");
  const colSnap = await getDocs(colRef);

  const boardSnap = await getDocs(collectionGroup(db, "boards"));
  const boardPaths = boardSnap.docs.map((doc) => {
    boardsId.push(doc.id.toString());
  });

  colSnap.docs.map((doc) => {
    boardsId.forEach((boardId) => {
      paths.push({
        params: {
          user_id: doc.id,
          dashboard_id: boardId,
        },
      });
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const user_id = context.params.user_id;
  const board_id = context.params.dashboard_id;
  const columns: object[] = [];

  // Fetches the columns of the dashboard according to dashboard_id
  const columnsRef = collection(
    db,
    `users/${user_id}/boards/${board_id}/columns`
  );
  const columnsSnapshot = await getDocs(columnsRef);

  return {
    props: {
      columnIds: columnsSnapshot.docs.map((doc) => doc.id),
    },
  };
};

interface DashboardPageProps {
  columnsId: string[];
  tasks: object[];
}

const DashboardPage = ({ columnIds }: DashboardPageProps) => {
  // This page should fetch the columns data from the firestore.
  const router = useRouter();
  const { user_id, dashboard_id } = router.query;

  const { user } = useAuthHook();

  console.log(columnIds);

  // Checks whether user is allowed to view this page
  useEffect(() => {
    if (user.uid !== user_id) {
      console.log("Not allowed to view this page!");
    }
  }, []);

  return (
    <ProtectedRoute>
      <Dashboard
        user_id={user_id}
        dashboard_id={dashboard_id}
        columnsIds={columnIds}
      />
    </ProtectedRoute>
  );
};

DashboardPage.PageLayout = DashboardLayout;

export default DashboardPage;
