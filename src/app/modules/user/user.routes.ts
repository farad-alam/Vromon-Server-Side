import { NextFunction, Request, Response, Router } from "express";
import { UserContrller } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { envVars } from "../../config/env";
import { Role } from "./user.interface";
import AppError from "../../errorHelper/appError";
import { StatusCodes } from "http-status-codes";
import { checkAuth } from "../../middlewares/checkAuth";



const router = Router();
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserContrller.createUser
);
router.get("/all-user", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserContrller.getAllUser);

const UserRoutes = router;
export default UserRoutes;
