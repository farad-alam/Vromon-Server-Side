import { NextFunction, Request, Response, Router } from "express";
import { User } from "./user.model";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.services";
import AppError from "../../errorHelper/appError";
import { success } from "zod";

const createUser = async (req: Request, res: Response, next:NextFunction) => {
  try {

    // throw new AppError(StatusCodes.NOT_FOUND,"a new error")
    // throw new Error("just error ")

    const newUser = await UserServices.createUser(req.body);

    res.status(StatusCodes.CREATED).json({
      message: `User created with ${newUser.email} successfully`,
      data: newUser,
    });
  } catch (error) {
    next(error)
  
  }
};


export const UserContrller = {
  createUser,
};
