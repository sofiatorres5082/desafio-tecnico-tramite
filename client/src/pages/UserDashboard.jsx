import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { FiLogOut, FiHome } from "react-icons/fi";
import { TfiReceipt, TfiPlus } from "react-icons/tfi";
import TramiteForm from "./TramiteForm";
import TramiteUserList from "./TramiteUserList";

const menus = [
  {
    name: "Inicio",
    link: "/dashboard",
    icon: FiHome,
  },
  {
    name: "Nuevo trámite",
    link: "tramite",
    icon: TfiPlus,
  },
  {
    name: "Tramites",
    link: "tramites",
    icon: TfiReceipt,
  },
  {
    name: "Cerrar sesión",
    link: "/logout",
    icon: FiLogOut,
    margin: true,
  },
];

const UserDashboard = () => {
  return (
    <DashboardLayout menus={menus}>
      <Routes>
        {/* Inicio */}
        <Route
          path="/"
          element={
            <div className="flex flex-col justify-center items-center mt-20 gap-8">
              <h1 className="mb-4 text-base font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-600">
                Panel de usuarios
              </h1>
              <img src="/images/users.jpg" alt="usuarios" className="mb-4 w-30 rounded-2xl md:w-2/5" /> 
            </div>
          }
        />
        {/* Nuevo trámite */}
        <Route path="tramite" element={<TramiteForm />} />
        {/* Mis trámites */}
        <Route path="tramites" element={<TramiteUserList />} />
      </Routes>
    </DashboardLayout>
  );
};

export default UserDashboard;
