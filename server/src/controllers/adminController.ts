import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userModel from "../model/userModel";

dotenv.config();

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log(req.body);

        let { username, password } = req.body;

        if (!username || !password) {
            res.status(404).json({ message: "All fields are required" });
            return;
        }

        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            // create a token

            let payload = {
                isAdmin:true,
            }
            let jwtSecretKey = process.env.JWT_SECRET || '';

            let token = jwt.sign(payload,jwtSecretKey,{expiresIn:'1h'});

            res.cookie('adminToken', token, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24
            }).status(200).json({ message: "Login successful" });


        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
        
    } catch (error) {
        next(error);
    }
}



export const getUsers = async(req: Request, res: Response, next: NextFunction) => {
    try {

        let userList = await userModel.find({}, { password: 0 });

        if (!userList) {
            res.status(404).json({ message: "There is no user details" });
            return;
        }

        let userDetails = userList.map((ele) => {
            return {
                name: ele.name,
                email: ele.email,
                id:ele.id
            }
        })
        console.log("🚀 ~ file: adminController.ts:60 ~ userDetails ~ userDetails:", userDetails);

        res.status(200).json({message:"user details retrieved successfully",users:userDetails})
        
    } catch (error) {
        next(error);
    }
}


export const adminLogout = async (req: Request, res: Response, next: NextFunction) => {
    try {

        res.clearCookie('adminToken');
        res.status(200).json({ message: "logout successfully" });
        
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log(req.body);

        let { id } = req.body;

        if (!id) {
            res.status(404).json({ message: "Cannot find the user without id" });
            return;
        }

        let deletedUser = await userModel.findByIdAndDelete(id);

        if (deletedUser) {
            res.status(200).json({ message: "user deleted successfully" });
        } else {
            res.status(404).json({ message: "Cannot delete the user" });
        }

        
    } catch (error) {
        next(error);
    }
}


