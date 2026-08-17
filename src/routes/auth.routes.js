import {Router} from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.get('/login', authController.login);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.get('/logout', authController.logout);

export default authRouter;