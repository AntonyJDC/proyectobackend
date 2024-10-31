import type { Request, Response } from "express";
import cors from "cors";
import express from "express";
import connectDB from "./config/db";
import router from "./routes/user.routes";

// API ROUTES IMPORTS

// MIDDLEWARES
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// ROUTES
app.use('/api/users', router);


// FALLBACKS

function routeNotFound(request: Request, response: Response) {
  response.status(404).json({
    message: "Route not found.",
  });
}

app.use(routeNotFound);

//app.use('/api/books', bookRoutes);
//app.use('/api/auth', authRoutes);  // Si tienes rutas de autenticación

// START SERVER
app.listen(8080, () => {
  console.log("Server listening to port 8080.");
});
