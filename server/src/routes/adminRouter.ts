import { Router } from "express";
import { adminLogin, adminLogout, deleteUser, getUsers } from "../controllers/adminController";
import { verifyToken } from "../middleware/verifyToken";
import { verifyAdminToken } from "../middleware/verifyAdminToken";

const adminRouter = Router();


adminRouter.post('/login',adminLogin);

adminRouter.post('/get-users',verifyAdminToken, getUsers);

adminRouter.post('/logout', adminLogout);

adminRouter.post('/delete-user',deleteUser);

export default adminRouter;