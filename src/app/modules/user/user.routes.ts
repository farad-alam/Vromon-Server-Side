import { Router } from "express";
import { UserContrller } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";

const router = Router();
router.post("/register", validateRequest(createUserZodSchema), UserContrller.createUser);
router.post("/all-user", UserContrller.getAllUser);

const UserRoutes = router;
export default UserRoutes;
