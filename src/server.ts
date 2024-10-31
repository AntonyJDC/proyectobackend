import express, { Application } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import cors from "cors";
import userRoutes from './routes/user.routes';
import connectDB from "./config/db";

const PORT = process.env.PORT || 8080;

// Configuración de variables de entorno
dotenv.config();

const app: Application = express();

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON en las solicitudes

// Rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/user', userRoutes); // Rutas de usuario, protegidas por autenticación
//app.use('/api/books', bookRoutes); // Rutas de libros

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
