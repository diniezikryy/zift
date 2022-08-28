import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import ProtectedRoute from "../../components/ProtectedRoute";
import { auth, db } from "../../utils/firebase";

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

// Fetches all possible data of the specific user from firestore

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

const UserPage = () => {
  const router = useRouter();
  const { user_id } = router.query;
  console.log(user_id);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <ProtectedRoute>
      <div>This is the user page of user: {user_id}</div>
      <button onClick={handleLogout}>sign out</button>
    </ProtectedRoute>
  );
};

export default UserPage;

// Generates all possible paths for baseUrl/:user_id/
