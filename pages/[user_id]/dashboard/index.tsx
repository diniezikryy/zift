import { useRouter } from "next/router";
import { auth, db } from "../../../utils/firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

export const getStaticPaths = async () => {
  const colRef = collection(db, "users");
  const colSnap = await getDocs(colRef);

  const paths = colSnap.docs.map((doc) => {
    return {
      params: {
        user_id: doc.id,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const user_id = context.params.user_id;

  // Fetches the columns of the dashboard according to dashboard_id
  const boardsRef = collection(db, `users/${user_id}/boards/`);
  const boardsSnapshot = await getDocs(boardsRef);

  // Fetches the tasks of the dashboard according to dashboard_id

  return {
    props: {
      fetchedBoardsId: boardsSnapshot.docs.map((doc) => doc.id),
    },
  };
};

interface DashboardIndexPageProps {
  fetchedBoardsId: string[];
}

const DashboardIndexPage = ({ fetchedBoardsId }: DashboardIndexPageProps) => {
  const [boardsId, setboardsId] = useState<string[]>(fetchedBoardsId);

  const Router = useRouter();
  const { user_id } = Router.query;

  // If user has no boards, redirect user to create new dashboard page, boards are empty, prompt to
  // create a new board

  useEffect(() => {
    if (boardsId.length > 1) {
      Router.push(`/${user_id}/dashboard/${boardsId[0]}`);
    } else {
      Router.push(`/${user_id}/dashboard/add-new-board`);
    }
  }, []);

  return (
    <div>Dashboard page of user {user_id} if he does not have a dashboard</div>
  );
};

export default DashboardIndexPage;
