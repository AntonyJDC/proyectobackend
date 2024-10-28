import { Request, Response } from "express";
import cors from "cors";
import express from "express";
import connectDB from "./config/db";

// API ROUTES IMPORTS

// MIDDLEWARES
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// ROUTES
const SERVER_VERSION = "/api/v1/";

// FALLBACKS

function routeNotFound(request: Request, response: Response) {
  response.status(404).json({
    message: "Route not found.",
  });
}

app.use(routeNotFound);

// START SERVER
app.listen(8080, () => {
  console.log("Server listening to port 8080.");
});
