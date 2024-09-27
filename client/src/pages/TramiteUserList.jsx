import React, { useEffect, useState } from "react";
import { getTramites } from "../services/api"; 

const TramiteUserList = () => {
  const [tramites, setTramites] = useState([]);

  useEffect(() => {
    const fetchTramites = async () => {
      try {
        const data = await getTramites();
        setTramites(data);
      } catch (error) {
        console.error("Error al cargar los trámites:", error);
      }
    };

    fetchTramites();
  }, []);

  return (
    <>
      <div className="p-12">
        <h1 className="text-2xl font-bold text-center text-[#576572] select-none">
          Mis trámites
        </h1>
      </div>
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full table text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-white uppercase font-bold bg-[#4481FF]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Comentario
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de Solicitud
              </th>
            </tr>
          </thead>
          <tbody>
            {tramites.map((tramite) => (
              <tr
                className="bg-white border-b"
                key={tramite.id}
              >
                <td className="px-6 py-4">{tramite.nombre}</td>
                <td className="px-6 py-4">{tramite.estado}</td>
                <td className="px-6 py-4">{tramite.comentario}</td>
                <td className="px-6 py-4">
                  {new Date(tramite.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TramiteUserList;
