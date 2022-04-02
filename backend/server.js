import dotenv from "dotenv";
import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import routeRoutes from "./routes/routeRoutes.js";
import stopRoutes from "./routes/stopRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/stops", stopRoutes);
app.use("/api/routes", routeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    // `server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
