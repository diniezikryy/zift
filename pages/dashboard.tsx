import ProtectedRoute from "../components/ProtectedRoute";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div className="container flex py-2 mx-auto">
        <div className="px-12 py-24 mx-auto mt-24 overflow-y-hidden text-gray-600">
          <h2 className="text-2xl font-semibold">Dashboard...</h2>
          <h3 className="text-xl font-semibold">
            Data should be rendered here
          </h3>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
