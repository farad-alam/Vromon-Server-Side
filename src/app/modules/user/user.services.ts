import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";

const createUser = async (payload : Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({email})

  if (isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST,"User Alredy exist with this email")
  }

  const hashedPassword = await bcryptjs.hash(password as string,10)

  const authProvider : IAuthProvider = {provider: "credentials", providerId : email as string}

  const newUser = User.create({
    
    email,
    password : hashedPassword,
    auths:[authProvider],
    ...rest
  });
  return newUser
};

const getAllUser = async () =>{
  const allUser = await User.find({}).lean()
  const totalUserCount = await User.countDocuments()
  return {
    allUser,
    meta :{
      total : totalUserCount
    }
  }
}

export const UserServices = {
    createUser,
    getAllUser
}
