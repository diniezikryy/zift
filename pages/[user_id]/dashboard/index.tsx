import { useRouter } from "next/router";

const DashboardIndexPage = () => {
  const router = useRouter();
  const { user_id } = router.query;

  return (
    <div>Dashboard page of user {user_id} if he does not have a dashboard</div>
  );
};

export default DashboardIndexPage;
