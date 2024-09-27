import React, { useEffect, useState, useMemo } from "react";
import { getTramites, updateTramite } from "../services/api"; 
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import { Button } from "@mui/material";

const TramiteAdminList = () => {
  const [tramites, setTramites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editedRow, setEditedRow] = useState(null);

  // Obtener los trámites
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

  // Función que se ejecuta cuando se presiona el botón de guardar para la fila
  const handleSaveClick = async () => {
    if (!editedRow) return; // Si no hay fila editada, no hacer nada
    setLoading(true);
    try {
      const { id_tramite, estado, comentario } = editedRow;

      // Llamada al backend para actualizar el trámite
      await updateTramite(id_tramite, { estado, comentario });
      setLoading(false);

      // Actualiza la fila localmente si todo va bien
      setTramites((prevTramites) =>
        prevTramites.map((tramite) =>
          tramite.id_tramite === editedRow.id_tramite ? editedRow : tramite
        )
      );
      setEditedRow(null); // Reinicia la fila editada después de guardarla
    } catch (error) {
      console.error("Error al actualizar el trámite:", error);
      setLoading(false);
    }
  };

  // Almacena temporalmente los cambios en la fila editada
  const processRowUpdate = (newRow) => {
    setEditedRow(newRow); // Guarda la fila editada en el estado
    return newRow; // Devuelve la fila editada
  };

  const columnas = useMemo(
    () => [
      { field: "nombre", headerName: "NOMBRE", width: 150, editable: false },
      {
        field: "apellido",
        headerName: "APELLIDO",
        width: 150,
        editable: false,
      },
      { field: "dni", headerName: "DNI", width: 130, editable: false },
      { field: "cuit", headerName: "CUIT", width: 130, editable: false },
      { field: "email", headerName: "EMAIL", width: 200, editable: false },
      {
        field: "telefono",
        headerName: "TELÉFONO",
        width: 130,
        editable: false,
      },
      { field: "dominio", headerName: "DOMINIO", width: 120, editable: false },
      { field: "anio", headerName: "AÑO", width: 100, editable: false },
      {
        field: "estado",
        headerName: "ESTADO",
        width: 160,
        editable: true,
        type: "singleSelect",
        valueOptions: ["Pendiente", "Aprobado", "Rechazado", "En Proceso"],
      },
      {
        field: "comentario",
        headerName: "COMENTARIOS",
        width: 250,
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "FECHA DE SOLICITUD",
        width: 200,
        editable: false,
      },
      {
        field: "updatedAt",
        headerName: "FECHA DE ACTUALIZACIÓN",
        width: 200,
        editable: false,
      },
      { field: "id_tramite", headerName: "ID", width: 50 },
      {
        field: "actions",
        headerName: "Acciones",
        width: 150,
        renderCell: () => (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClick}
            disabled={!editedRow} // Deshabilita si no hay una fila editada
          >
            Guardar
          </Button>
        ),
      },
    ],
    [editedRow]
  );

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-center text-[#576572] select-none">
          Trámites
        </h1>
      </div>
      {loading && <CircularProgress />} {/* Spinner mientras carga */}
      <DataGrid
        columns={columnas}
        rows={tramites}
        getRowId={(row) => row.id_tramite}
        editMode="row"
        pageSize={10}
        processRowUpdate={processRowUpdate} // Maneja la actualización de las filas
      />
    </>
  );
};

export default TramiteAdminList;
