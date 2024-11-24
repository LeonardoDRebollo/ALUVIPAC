export const TableServices = () => {
  return <div>TableServices</div>;
};
import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { ServiceInterface } from "./services.component";
import { enqueueSnackbar } from "notistack";
const ServicesTable = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceImage, setServiceImage] = useState<File>(
    null as unknown as File
  );
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [badServiceName, setBadServiceName] = useState(false);
  const [badServiceDescription, setBadServiceDescription] = useState(false);
  const [badServiceImage, setBadServiceImage] = useState(false);
  const [EditMode, setEditMode] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceInterface | null>(
    null
  )

  const formValidation = async () => {
    if (serviceName === "") {
      setBadServiceName(true);
    } else {
      setBadServiceName(false);
    }

    if (serviceDescription === "") {
      setBadServiceDescription(true);
    } else {
      setBadServiceDescription(false);
    }

    if (serviceImage === null) {
      setBadServiceImage(true);
    } else {
      setBadServiceImage(false);
    }

    if (badServiceName || badServiceDescription || badServiceImage) {
      return false;
    }

     
    if(EditMode){
      try {
        const imageBase64 = await convertImageToBase64(serviceImage);
  
        const bodyData = {
          imagen: imageBase64,
          nombre_servicio: serviceName.toLocaleUpperCase(),
          descripcion_servicio: serviceDescription,
        };
  
        const response = await fetch(`http://localhost:8855/api/servicios/${selectedService?.id_servicio}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });
  
        if (response.ok) {
          enqueueSnackbar("Servicio actualizado con exito", {
            variant: "success",
          });
          setIsServiceModalOpen(false);
          setServiceImage(null as unknown as File);
          setServiceName("");
          setServiceDescription("");
          fetchServices();
        } else {
          enqueueSnackbar("Error al actualizar el servicio " + response, {
            variant: "error",
          });
          setServiceImage(null as unknown as File);
          setServiceName("");
          setServiceDescription("");
        }
      } catch (error) {
        enqueueSnackbar("Error al procesar la solicitud: " + error, {
          variant: "error",
        });
      }
    }else{
      try {
        const imageBase64 = await convertImageToBase64(serviceImage);
  
        const bodyData = {
          imagen: imageBase64,
          nombre_servicio: serviceName.toLocaleUpperCase(),
          descripcion_servicio: serviceDescription,
        };
  
        const response = await fetch("http://localhost:8855/api/servicios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });
  
        if (response.ok) {
          enqueueSnackbar("Servicio creado con exito", {
            variant: "success",
          });
          setIsServiceModalOpen(false);
          setServiceImage(null as unknown as File);
          setServiceName("");
          setServiceDescription("");
          fetchServices();
        } else {
          enqueueSnackbar("Error al crear el servicio", {
            variant: "error",
          });
          setServiceImage(null as unknown as File);
          setServiceName("");
          setServiceDescription("");
        }
      } catch (error) {
        enqueueSnackbar("Error al procesar la solicitud: " + error, {
          variant: "error",
        });
      }
    }
   
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:8855/api/servicios");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error al cargar los servicios:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async () => {
    try {
      const response = await fetch(
        `http://localhost:8855/api/servicios/${selectedService?.id_servicio}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        enqueueSnackbar("Servicio eliminado con exito", {
          variant: "success",
        });
        fetchServices();
      } else {
        enqueueSnackbar("Error al eliminar el servicio" + response, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Error al procesar la solicitud: " + error, {
        variant: "error",
      });
    }
  }

  useEffect(() => {
       fetchServices();
  }, []);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const columns: GridColDef[] = [
    { field: "id_servicio", headerName: "ID Servicio",  flex: 0.5 },
    {
      field: "imagen",
      headerName: "Imagen",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`data:image/png;base64,${params.row.imagen}`}
          alt="Imagen del servicio"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      ),
    },
    { field: "nombre_servicio", headerName: "Nombre del Servicio",  flex: 1 },
    { field: "descripcion_servicio", headerName: "Descripción", flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center", padding: 1 }}>
        <Button
          variant="outlined"
      
          color="warning"
          onClick={() => {setEditMode(true),setIsServiceModalOpen(true),setSelectedService(params.row), setServiceImage(params.row.imagen), setServiceName(params.row.nombre_servicio), setServiceDescription(params.row.descripcion_servicio)}}
        >
          <EditRoundedIcon />
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {setIsConfirmModalOpen(true), setSelectedService(params.row)} }
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
        <h1>Lista de Servicios</h1>
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginBottom: 2 }}
          onClick={() => {setEditMode(false),setIsServiceModalOpen(true), setServiceImage(null as unknown as File), setServiceName(""), setServiceDescription("")}}
        >
          {" "}
          <AddRoundedIcon />Agregar Servicio
        </Button>
        <DataGrid
          rows={services}
          columns={columns}
          getRowId={(row) => row.id_servicio}
          loading={loading}
          filterMode="server"
          sortingMode="server"
          pagination
        />
      </Box>
      <Dialog
        open={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        aria-labelledby="login-dialog-title"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <DialogTitle id="login-dialog-title">
          {EditMode ? "Editar Servicio" : "Agregar Servicio"}
        </DialogTitle>
        <DialogContent>
          <form>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Subir imagen
              <VisuallyHiddenInput
                type="file"
                accept="image/*" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setServiceImage(e.target.files[0]); 
                  }
                }}
              />
            </Button>
            {EditMode  ? <p style={{ color: "red" }}>Es necesario volver a subir una imagen</p> : ""}
            {serviceImage && <p>Archivo seleccionado: {serviceImage.name}</p> }

            <TextField
              fullWidth
              error={badServiceName}
              margin="normal"
              label="Nombre del servicio"
              type="text"
              value={serviceName}
              variant="outlined"
              onChange={(e) => setServiceName(e.target.value)}
              helperText={
                badServiceName ? "El nombre del servicio es obligatorio" : ""
              }
            />
            <TextField
              fullWidth
              error={badServiceDescription}
              margin="normal"
              label="Descripción del servicio"
              multiline
              rows={3}
              maxRows={4}
              variant="outlined"
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              helperText={
                badServiceDescription
                  ? "La descripción del servicio es obligatoria"
                  : ""
              }
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "Urbanist",
              }}
            >
              <a className="about-us-button" onClick={formValidation}>
                Aceptar
              </a>
            </div>
          </form>
        </DialogContent>
      </Dialog>
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
           <p>¿Estas seguro de eliminar el servicio?</p>
              <a className="about-us-button" onClick={deleteService}>
                Aceptar
              </a>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesTable;
