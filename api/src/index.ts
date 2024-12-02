import express, { Application } from "express";
import { CONFIG } from "./config";
import eventRoutes from "./routes/eventRoutes";

const app: Application = express();

app.use(express.json());

app.use(CONFIG.API_V1_PATH, eventRoutes);

const server = app.listen(CONFIG.PORT, () => {
  console.log(`Server at http://localhost:${CONFIG.PORT}`);
});

export { app, server };
