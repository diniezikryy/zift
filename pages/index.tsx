import type { NextPage } from "next";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../components/Dashboard/Dashboard";

const Home: NextPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </div>
  );
};

export default Home;
