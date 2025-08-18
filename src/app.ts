import express, { Request, Response } from "express";
import { router } from "./app/routes";

const app = express();
app.use(express.json())


app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Vromon, A place to arrange beautiful Tour",
  });
});

export default app;
