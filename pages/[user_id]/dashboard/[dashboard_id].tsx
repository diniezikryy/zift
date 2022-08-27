import { collection, collectionGroup, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { db } from "../../../utils/firebase";

export async function getStaticPaths() {
  const paths = [];
  const boardsId = [];

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
}

export const getStaticProps = async (context: any) => {
  const user_id = context.params.user_id;
  const colRef = collection(db, "users", user_id, "boards");
  const colSnap = await getDocs(colRef);

  const allBoards = await getDocs(collectionGroup(db, "boards"));
  return {
    props: {
      boards: colSnap.docs.map((doc) => doc.data()),
      allBoards: allBoards.docs.map((board) => board.id),
    },
  };
};

const DashboardPage = ({ boards, allBoards }) => {
  // This page should fetch the columns data from the firestore.

  console.log(allBoards);

  const router = useRouter();
  const { user_id, dashboard_id } = router.query;

  return (
    <div>
      This is the user {user_id} first dashboard page of id {dashboard_id}.
    </div>
  );
};

export default DashboardPage;
