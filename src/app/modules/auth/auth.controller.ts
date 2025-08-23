import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";
import { snedResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthServices.credentialsLogin(req.body);

    snedResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User Authenticated Succesfully",
      data: result,
    });
  }
);

export const AuthController = {
  credentialsLogin,
};