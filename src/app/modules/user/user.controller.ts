import { NextFunction, Request, Response, Router } from "express";
import { User } from "./user.model";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.services";
import AppError from "../../errorHelper/appError";
import { catchAsync } from "../../utils/catchAsync";
import { snedResponse } from "../../utils/sendResponse";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await UserServices.createUser(req.body);

    snedResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "All user Retrived successfully",
      data: newUser,
    });
  }
);

const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUser();

    // res.status(StatusCodes.OK).json({
    //   message:"Retrive all user",
    //   data : alluser
    // })

    snedResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All user Retrived successfully",
      data: result.allUser,
      meta: result.meta,
    });
  }
);


export const UserContrller = {
  createUser,
  getAllUser,
};
