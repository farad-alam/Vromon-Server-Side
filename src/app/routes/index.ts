import { Router } from "express";
import UserRoutes from "../modules/user/user.routes";
import AuthRoutes from "../modules/auth/auth.routes";



export const router = Router()

const moduleRoutes = [
    {
        path : "/user",
        routes : UserRoutes
    },
    {
        path : "/auth",
        routes : AuthRoutes
    }
]

moduleRoutes.forEach((route)=>{
    router.use(route.path, route.routes)
})