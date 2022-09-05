import {
  collection,
  collectionGroup,
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

  // Fetches the columns of the dashboard according to dashboard_id
  const columnsRef = collection(
    db,
    `users/${user_id}/boards/${board_id}/columns`
  );
  const columnsSnapshot = await getDocs(columnsRef);

  // Fetches the tasks of the dashboard according to dashboard_id
  const tasksRef = collection(
    db,
    `users/${user_id}/boards/${board_id}/columns/W9hM4c0UMy8ECVEcCygz/tasks`
  );
  const tasksSnapshot = await getDocs(tasksRef);

  return {
    props: {
      columnsId: columnsSnapshot.docs.map((doc) => doc.id),
      tasks: tasksSnapshot.docs.map((doc) => doc.data()),
    },
  };
};

interface DashboardPageProps {
  columnsId: string[];
  tasks: object[];
}

const DashboardPage = ({ columnsId, tasks }: DashboardPageProps) => {
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
        columnsId={columnsId}
        tasks={tasks}
      />
    </ProtectedRoute>
  );
};

DashboardPage.PageLayout = DashboardLayout;

export default DashboardPage;
