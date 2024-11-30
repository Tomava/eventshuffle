import express, { Application } from "express";
import { CONFIG } from "./config";
import eventRoutes from "./routes/eventRoutes";
import connectToDb from "./database/db";

const app: Application = express();

app.use(express.json());

app.use("/api/v1", eventRoutes);

connectToDb();

app.listen(CONFIG.PORT, () => {
  console.log(`Server at http://localhost:${CONFIG.PORT}`);
});
