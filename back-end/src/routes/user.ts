import { Router } from "express";
import { login, register } from "../contrallers/user";


const userRouter = Router();

userRouter.route('/').post(register);
userRouter.route('/login').post(login);

export default userRouter;
