import express, { Request, Response, Application } from "express";
import { CONFIG } from "./config";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(CONFIG.PORT, () => {
  console.log(`Server at http://localhost:${CONFIG.PORT}`);
});
