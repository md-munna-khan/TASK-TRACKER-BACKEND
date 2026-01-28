import { Router } from "express";

import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../interface/enums";




const router = Router()


router.post("/login", AuthController.credentialsLogin)
router.post("/refresh-token", AuthController.getNewAccessToken)
router.post("/logout", AuthController.logout)
router.get("/me", checkAuth(...Object.values(Role)), AuthController.getMe)




export const AuthRoutes = router 