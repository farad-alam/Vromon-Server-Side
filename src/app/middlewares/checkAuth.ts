import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelper/appError";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/jwt";

export const checkAuth = (...UserRoles : string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {

        const accessToken = req.headers.authorization
        const verifyAccessToken = verifyToken(accessToken as string)

        if (!UserRoles.includes(verifyAccessToken.role)) {
            throw new AppError(StatusCodes.FORBIDDEN,"You haven't access on this route")
        }
        next()
        
    } catch (error) {
        next(error)
    }
};