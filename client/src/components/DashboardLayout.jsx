import React from "react";
import SideBar from "./SideBar.jsx";

const DashboardLayout = ({ menus, children }) => (
  <main className="bg-[#E8EDF5] h-screen flex items-center justify-center">
    <section className="bg-white w-full h-screen sm:rounded-3xl sm:w-[calc(100%-32px)] sm:h-[calc(100%-30px)] flex overflow-hidden">
      {/* Sidebar */}
      <SideBar menus={menus} />
      {/* Contenido principal */}
      <div className="flex-grow p-4 overflow-auto">
        {children}
      </div>
    </section>
  </main>
);

export default DashboardLayout;
