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

const getAllUser = () =>{
  const allUser = User.find({})
  return allUser
}

export const UserServices = {
    createUser,
    getAllUser
}
