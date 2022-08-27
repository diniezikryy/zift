import { useRouter } from "next/router";
import React from "react";

const DashboardPage = () => {
  const router = useRouter();
  const { user_id, dashboard_id } = router.query;
  return (
    <div>
      This is the user {user_id} first dashboard page of id {dashboard_id}.
    </div>
  );
};

export default DashboardPage;
