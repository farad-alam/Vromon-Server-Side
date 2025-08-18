import express, { Request, Response } from "express";
import UserRouter from "./app/modules/user/user.controller";

const app = express();
app.use(express.json())


app.use("/api/v1/user", UserRouter)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Vromon, A place to arrange beautiful Tour",
  });
});

export default app;
