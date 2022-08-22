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
import Navbar from "../../components/Dashboard/Sidebar/Navbar";
import ShowSidebar from "../../assets/icon-show-sidebar.svg";

interface DashboardProps {
  boards: [];
}

const DashboardPage = ({ boards }: DashboardProps) => {
  const [toggleCollapse, setToggleCollapse] = useState(false);

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-row justify-start h-screen">
        <div className="shadow-2xl shadow-black">
          <Sidebar
            handleSidebarToggle={handleSidebarToggle}
            toggleCollapse={toggleCollapse}
            boards={boards}
          />
        </div>

        <div className="relative flex-1 w-full bg-grey-light-secondary">
          <Navbar />

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
