import { NextFunction, Request, Response } from "express";

type ICatchAsync = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync = (fn: ICatchAsync) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: any) => {
      console.log(err);
      next(err);
    });
  };