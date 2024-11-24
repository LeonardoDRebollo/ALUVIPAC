import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
app.use(cors());

app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/api/cotizaciones', async (_req, res) => {
  try {
    const cotizaciones = await prisma.cotizacion.findMany({
      include: {
        servicio: true, 
      },
    });
    res.json(cotizaciones);
  } catch (error) {
    console.error('Error al obtener las cotizaciones:', error);
    res.status(500).json({ error: 'Error al obtener las cotizaciones' });
  }
});


app.get('/api/servicios', async (_req, res) => {
  try {
    const servicios = await prisma.servicio.findMany();

    const serviciosConImagenBase64 = servicios.map((servicio) => ({
      ...servicio,
      imagen: servicio.imagen
        ? Buffer.from(servicio.imagen).toString('base64')
        : null,
    }));

    res.json(serviciosConImagenBase64);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
});



app.post('/api/cotizaciones', async (req, res) => {
  const { nombres, apellidos, telefono, email, mensaje, id_servicio } = req.body;

  // Validación
  if (!id_servicio || !nombres || !apellidos || !telefono || !email) {
    return res.status(400).json({ error: 'Todos los campos requeridos deben estar presentes' });
  }

  if (mensaje && mensaje.length > 250) {
    return res.status(400).json({ error: 'El mensaje no puede tener más de 250 caracteres' });
  }

  try {
    const nuevaCotizacion = await prisma.cotizacion.create({
      data: {
        nombres,
        apellidos,
        telefono,
        email,
        mensaje: mensaje || null,
        fecha_hora: new Date(),
        id_servicio,
      },
    });

    res.status(201).json(nuevaCotizacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar la cotización' });
  }
});


app.post('/api/servicios', async (req, res) => {
  const { imagen, nombre_servicio, descripcion_servicio } = req.body;

  if (!imagen || !nombre_servicio || !descripcion_servicio) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }
  const base64Regex = /^data:image\/(png|jpg|jpeg);base64,/;
  if (!base64Regex.test(imagen)) {
    return res.status(400).json({ error: 'El formato de la imagen no es válido.' });
  }

  const base64Data = imagen.replace(base64Regex, '');
  
  try {
    const nuevoServicio = await prisma.servicio.create({
      data: {
        imagen: Buffer.from(base64Data, 'base64'), 
        nombre_servicio,
        descripcion_servicio,
      },
    });

    res.status(201).json(nuevoServicio);
  } catch (error) {
    console.error('Error al agregar el servicio:', error);
    res.status(500).json({ error: 'Error al agregar el servicio' });
  }
});


app.patch('/api/servicios/:id', async (req, res) => {
  const { id } = req.params;
  const { imagen, nombre_servicio, descripcion_servicio } = req.body;
  if (!imagen || !nombre_servicio || !descripcion_servicio) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }
  const base64Regex = /^data:image\/(png|jpg|jpeg);base64,/;
  if (!base64Regex.test(imagen)) {
    return res.status(400).json({ error: 'El formato de la imagen no es válido.' });
  }

  const base64Data = imagen.replace(base64Regex, '');
  try {
    const servicio = await prisma.servicio.update({
      where: { id_servicio: Number(id) },
      data: {
        imagen: Buffer.from( base64Data, 'base64'), 
        nombre_servicio,
        descripcion_servicio,
      },
    });
    res.json(servicio);
  } catch (error) {
    console.error('Error al actualizar el servicio:', error);
    res.status(500).json({ error: 'Error al actualizar el servicio' });
  }
});


app.delete('/api/servicios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const servicio = await prisma.servicio.delete({
      where: { id_servicio: Number(id) },
    });
    res.json(servicio);
  } catch (error) {
    console.error('Error al eliminar el servicio:', error);
    res.status(500).json({ error: 'Error al eliminar el servicio' });
  }
});

app.delete('/api/cotizaciones/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cotizacion = await prisma.cotizacion.delete({
      where: { id_cotizacion: Number(id) },
    });
    res.json(cotizacion);
  } catch (error) {
    console.error('Error al eliminar la cotizacion:', error);
    res.status(500).json({ error: 'Error al eliminar la cotizacion' });
  }
});



const PORT = 8855;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
