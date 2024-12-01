import express, { Application } from "express";
import { CONFIG } from "./config";
import eventRoutes from "./routes/eventRoutes";

const app: Application = express();

app.use(express.json());

app.use("/api/v1", eventRoutes);

const server = app.listen(CONFIG.PORT, () => {
  console.log(`Server at http://localhost:${CONFIG.PORT}`);
});

export { app, server };
