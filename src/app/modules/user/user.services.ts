import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = (payload : Partial<IUser>) => {
  const { name, email } = payload;

  const newUser = User.create({
    name,
    email,
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
