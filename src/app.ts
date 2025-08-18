import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Vromon, A place to arrange beautiful Tour",
  });
});

export default app;

const heelo = "hello"
