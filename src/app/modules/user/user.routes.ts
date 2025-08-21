import { Router } from "express";
import { UserContrller } from "./user.controller";

const router = Router();
router.post("/register", UserContrller.createUser);
router.post("/", UserContrller.getAllUser);

const UserRoutes = router;
export default UserRoutes;
