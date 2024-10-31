


import { Router } from "express";
import {  getProfile, userLogin, userLogout, userSingUp } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";


const userRouter = Router();


userRouter.post('/signup', userSingUp);

userRouter.post('/login', userLogin);

userRouter.post('/get-profile', verifyToken, getProfile);

userRouter.post('/logout', userLogout);


export default userRouter;