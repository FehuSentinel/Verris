import 'dotenv/config';
import express from 'express';
import cors from 'cors'; // Importar CORS
import routesEventos from './routes/eventos.js';
import routesUsuarios from './routes/usuarios.js';
import dbClient from './config/dbClient.js';

const app = express();

// Habilitar CORS para permitir peticiones desde React
app.use(cors());

// Middleware para parsear JSON (ya viene incluido en Express)
app.use(express.json());

// Prefijo para las rutas
app.use('/api/eventos', routesEventos);
app.use('/api/usuarios', routesUsuarios);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/api`));

// Cerrar conexión a la BD cuando la app se detiene
process.on('SIGINT', async () => {
    await dbClient.cerrarConexion();
    process.exit(0);
});
