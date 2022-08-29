import React from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
