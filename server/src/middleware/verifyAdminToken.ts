import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const verifyAdminToken = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {

        const token = req.cookies.adminToken;
        if (!token) {
            res.status(404).json({ message: "Token is missing" });
            return;
        }

        let jwtSecretKey = process.env.JWT_SECRET || '';
        const decodedToken = await jwt.verify(token, jwtSecretKey);
        if (decodedToken) {
            next();
        } else {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        
    } catch (error:any) {
        res.status(500).json({ error:error.message });
    }
}