import { envVars } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcryptjs from "bcryptjs";


export const seedSuperAdmin = async () => {
  const isSuperAdminExist = await User.findOne({
    email: envVars.SUPER_ADMIN_EMAIL,
  });
  if (isSuperAdminExist) {
    console.log("Super Admin Already Exist");
    return;
  }

  const hashedPassword = await bcryptjs.hash(
    envVars.SUPER_ADMIN_PASS,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: envVars.SUPER_ADMIN_EMAIL,
  };

  const superAsminDetails: Partial<IUser> = {
    name: "Super Admin",
    email: envVars.SUPER_ADMIN_EMAIL,
    password: hashedPassword,
    role: Role.SUPER_ADMIN,
    isVerified: true,
    auths: [authProvider],
  };

  console.log("Creating Super Admin..........");
  const superAdmin = User.create(superAsminDetails);
  console.log("Super Admin Created Successfully!");
};
