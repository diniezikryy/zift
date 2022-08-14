import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { db } from "../../../utils/firebase";

interface SidebarProps {}

const Sidebar = () => {
  return (
    <>
      <h1>Sidebar...</h1>
    </>
  );
};

export async function getServerSideProps() {
  const colRef = collection(db, "users", "RjR2ZxyZg7h2qiIkiY7K0pcETp92");
  const colSnap = await getDocs(colRef);

  console.log("fired");

  colSnap.docs.map((doc) => {
    console.log("Docs: ");
    console.log(doc.data());
  });
}

export default Sidebar;
