import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";


const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password : userPassword } = payload;

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

  const {password, ...rest} = isUserExist
  return {
    ...rest
  }
};


export const AuthServices = {
  credentialsLogin,
};