import {
  collection,
  collectionGroup,
  DocumentData,
  getDocs,
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
  columns_ids: string[];
}

const DashboardPage = ({ columns_ids }: DashboardPageProps) => {
  // This page should fetch the columns data from the firestore.
  const router = useRouter();
  const { user_id, dashboard_id } = router.query;

  const { user } = useAuthHook();

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
        columns_ids={columns_ids}
      />
    </ProtectedRoute>
  );
};

DashboardPage.PageLayout = DashboardLayout;

export default DashboardPage;
