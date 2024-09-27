import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { FiLogOut } from "react-icons/fi";
import { TfiReceipt, TfiPlus } from "react-icons/tfi";
import TramiteAdminList from "./TramiteAdminList";

// Menús de administradores
const menus = [
  {
    name: "Inicio",
    link: "/admin",
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

const AdminDashboard = () => {
  return (
    <>
      <DashboardLayout menus={menus}>
        <Routes>
          {/* Inicio */}
          <Route
            path="/"
            element={
              <div className="flex flex-col justify-center items-center mt-20 gap-8">
                <h1 className="mb-4 text-base font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-600">
                  Panel de administradores
                </h1>
                <img
                  src="/images/admin.jpg"
                  alt="administradores"
                  className="mb-4 w-30 rounded-2xl md:w-2/5"
                />
              </div>
            }
          />
          {/* Mostrar lista de todos los trámites, actualizar estado y comentarios */}
          <Route path="tramites" element={<TramiteAdminList />} />
        </Routes>
      </DashboardLayout>
    </>
  );
};

export default AdminDashboard;
