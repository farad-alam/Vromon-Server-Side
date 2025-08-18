import { Request, Response, Router } from "express";
import { User } from "./user.model";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const newUser = await User.create({
      name,
      email,
    });

    res.status(StatusCodes.CREATED).json({
      message: `User created with ${newUser.email} successfully`,
      data: newUser,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Something went wrong ${error}`,
    });
  }
});


const UserRouter = router
export default UserRouter
