import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/nav-bar";

interface LayoutProps {
  title: string;
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
