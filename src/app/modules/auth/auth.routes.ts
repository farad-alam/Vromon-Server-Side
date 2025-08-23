import { Router } from "express";
import { AuthController } from "./auth.controller";


const router = Router()

router.post("/login", AuthController.credentialsLogin);

const AuthRoutes = router

export default AuthRoutes