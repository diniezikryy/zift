import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
  const { user_id } = router.query;
  console.log(user_id);

  return <div>This is the user page of user: {user_id}</div>;
};

export default UserPage;
