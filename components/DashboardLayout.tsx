import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthHook } from "../context/AuthContext";
import { db } from "../utils/firebase";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [boards, setBoards] = useState<any>([]);
  const [selectedBoard, setSelectedBoard] = useState({});
  const router = useRouter();
  const { user } = useAuthHook();

  useEffect(() => {
    const colRef = collection(db, "users", user.uid, "boards");
    getDocs(colRef)
      .then((snapshot) => {
        const fetchedBoards: DocumentData[] = [];
        snapshot.docs.forEach((doc) => {
          fetchedBoards.push({ boardName: doc.data().name, boardId: doc.id });
        });
        setSelectedBoard(fetchedBoards[0]);
        setBoards(fetchedBoards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(selectedBoard);

  return (
    <div className="flex">
      <Sidebar
        boards={boards}
        setBoards={setBoards}
        open={open}
        setOpen={setOpen}
        setSelectedBoard={setSelectedBoard}
      />
      <div className="w-full bg-grey-light-primary">
        <Navbar selectedBoard={selectedBoard} open={open} />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
