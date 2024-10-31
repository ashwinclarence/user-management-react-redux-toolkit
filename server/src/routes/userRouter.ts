


import { Router } from "express";
import {  getProfile, uploadImage, userLogin, userLogout, userSingUp } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";


const userRouter = Router();


userRouter.post('/signup', userSingUp);

userRouter.post('/login', userLogin);

userRouter.post('/get-profile', verifyToken, getProfile);

userRouter.post('/logout', userLogout);

userRouter.post('/upload-image',verifyToken,uploadImage)


export default userRouter;