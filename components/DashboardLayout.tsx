import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <h1>Sidebar in here lol</h1>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
