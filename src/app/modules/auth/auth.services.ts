import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { genarateToken } from "../../utils/jwt";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password: userPassword } = payload;

  const isUserExist = await User.findOne({ email }).lean();

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "No User exist with this email");
  }

  const isPasswordMatch = await bcryptjs.compare(
    userPassword as string,
    isUserExist.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect Passoerd");
  }

  const jwtPayload = {
    id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = genarateToken(jwtPayload);

  const { password, ...rest } = isUserExist;
  return {
    accessToken,
  };
};

export const AuthServices = {
  credentialsLogin,
};
