import { Router } from "express";

const adminRouter = Router();



adminRouter.get('/login', (req, res) => {
    res.send("this is admin router");
})


export default adminRouter;