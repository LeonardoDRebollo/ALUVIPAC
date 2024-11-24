import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { enqueueSnackbar } from "notistack";
import { formatDateTime, formatPhoneNumber } from "../functions/utils.functions";

interface CotizacionInterface {
  id_cotizacion: number;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  fecha_hora: string;
  id_servicio: number;
}
const CotizacionesTable = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] = useState<CotizacionInterface | null>(null);

  const fetchCotizaciones = async () => {
    try {
      const response = await fetch("http://localhost:8855/api/cotizaciones");
      const data = await response.json();
      const transformedData = data.map((cotizacion: any) => ({
        ...cotizacion,
        nombre_servicio: cotizacion.servicio?.nombre_servicio || "Sin servicio", 
      }));

      setCotizaciones(transformedData); 
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Error al cargar las cotizaciones " + error, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    fetchCotizaciones();
  }, []);

  const deleteCotizacion = async () => {
    try {
      const response = await fetch(
        `http://localhost:8855/api/cotizaciones/${selectedCotizacion?.id_cotizacion}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        enqueueSnackbar("Cotizacion eliminada con exito", {
          variant: "success",
        });
        setIsConfirmModalOpen(false);
        fetchCotizaciones();
      } else {
        enqueueSnackbar("Error al eliminar la cotizacion" + response, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Error al procesar la solicitud: " + error , {
        variant: "error",
      });
    }
  }
  

  const columns: GridColDef[] = [
    { field: "id_cotizacion", headerName: "ID",  flex: 0.5 },
    { field: "nombre", headerName: "Nombres",  flex: 1, renderCell: (params) => params.row.nombres + " " + params.row.apellidos },
    { field: "telefono", headerName: "Teléfono",  flex: 1, renderCell: (params) => 
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 1, height: "100%" }}>
        <Tooltip title={"Copiar teléfono al portapapeles"}>
      <Chip variant="outlined" color="primary" label={formatPhoneNumber(params.row.telefono)} onClick={() => {navigator.clipboard.writeText(params.row.telefono), enqueueSnackbar("Teléfono copiado al portapapeles") } } />
        </Tooltip>
      </div> },
    { field: "email", headerName: "Email", flex: 1, renderCell: (params) => 
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 1, height: "100%" }}>
        <Tooltip title={"Copiar email al portapapeles"}>
      <Chip color="primary" label={params.row.email} onClick={() => {navigator.clipboard.writeText(params.row.email), enqueueSnackbar("Email copiado al portapapeles") } } />
        </Tooltip>
      </div> },
    { field: "nombre_servicio", headerName: "Servicio solicitado",  flex: 1 },
    { field: "mensaje", headerName: "Mensaje", flex: 2, renderCell: (params) => params.row.mensaje || "Sin mensaje" },
    {
      field: "fecha_hora",
      headerName: "Fecha y Hora",
      flex: 1,
      renderCell: (params) => {
        formatDateTime(params.row.fecha_hora);
        return formatDateTime(params.row.fecha_hora);
      }
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center", padding: 1 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {setIsConfirmModalOpen(true), setSelectedCotizacion(params.row)} }
        >
          <DeleteRoundedIcon />
        </Button>
        </Box>
      ),
    },
  ];

  return (
    <div className="table-pricing-container">
 <Box sx={{ height: 500, width: "100%", marginTop: 5 }}>
      <h1>Lista de Cotizaciones</h1>
      <DataGrid
        rows={cotizaciones}
        columns={columns}
        getRowId={(row) => row.id_cotizacion} 
        loading={loading}
        filterMode="server"
        sortingMode="server"
        
        pagination
      />
    </Box>
    <Dialog
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        aria-labelledby="login-dialog-title"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <DialogTitle id="login-dialog-title">
          Confirmar
        </DialogTitle>
        <DialogContent style={{ textAlign: "center", fontFamily: "Urbanist" }}>
           <p>¿Estas seguro de eliminar esta cotizacion?</p>
              <a className="about-us-button" onClick={deleteCotizacion}>
                Aceptar
              </a>
        </DialogContent>
      </Dialog>
    </div>
   
  );
};

export default CotizacionesTable;
