import { useRouter } from "next/router";

const DashboardIndexPage = () => {
  const router = useRouter();
  const { user_id } = router.query;

  // If user has no boards, redirect user to create new dashboard page, if the dashboard is empty, prompt to
  // create a new column

  return (
    <div>Dashboard page of user {user_id} if he does not have a dashboard</div>
  );
};

export default DashboardIndexPage;
