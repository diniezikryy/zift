import ProtectedRoute from "../../components/ProtectedRoute";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  collectionGroup,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import ShowSidebar from "../../assets/icon-show-sidebar.svg";
import { Board } from "../../utils/models";
import Dashboard from "../../components/dashboard/Dashboard";

interface Props {
  userId: string;
  boardsId: string[];
  boards: string[];
}

const DashboardPage: React.FC<Props> = ({ userId, boardsId, boards }) => {
  const [toggleCollapse, setToggleCollapse] = useState<boolean>(false);
  const [selectedBoard, setSelectedBoard] = useState<string>("Platform Launch");

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <>
      <ProtectedRoute>
        <div className="flex flex-row justify-start h-screen">
          <Sidebar
            handleSidebarToggle={handleSidebarToggle}
            toggleCollapse={toggleCollapse}
            boards={boards}
          />

          <div className="relative flex flex-col flex-1 w-full bg-grey-light-secondary">
            <Navbar boardName={selectedBoard} />

            <Dashboard />

            <div
              className={`px-5 py-3.5 bg-purple-primary h-fit w-fit rounded-r-full absolute left-0 bottom-4 ${
                toggleCollapse ? "" : "hidden"
              }`}
            >
              <button onClick={handleSidebarToggle}>
                <ShowSidebar />
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
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
      userId: id,
      boardsId: colSnap.docs.map((doc) => doc.id),
      boards: colSnap.docs.map((doc) => doc.data().name),
    },
  };
};

export default DashboardPage;
