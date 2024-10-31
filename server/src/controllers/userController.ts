import { NextFunction, Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userSingUp = async(req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {


        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ message: "Invalid form data", success: false });
            return;
        }

        const userExist = await userModel.findOne({ email });

        if (userExist) {
            res.status(400).json({ message: "User exist with same email id", success: false });
            return;
        }

        // hashing the password
        const saltValue = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltValue);

        // before this hash the password
        let newUser = new userModel({
            email,
            name,
            password:hashedPassword
        })

        await newUser.save();
        

        res.status(200).json({ message: "User created successfully", success: true });
        
    } catch (error) {
        next(error);
    }
}



export const userLogin = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        console.log(req.body);

        let { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "All field are required", success: false });
            return;
        }

        let userExist = await userModel.findOne({ email });


        if (!userExist) {
            res.status(404).json({ message: "User not exist with this email address", success: false });
            return;
        }

        // now user is exist we want to check the password

        let comparedPassword = await bcrypt.compare(password, userExist.password!);

        if (!comparedPassword) {
            res.status(404).json({ message: "Invalid email or password", success: false });
            return;
        }


        // create a token
        let jwtSecretKey = process.env.JWT_SECRET || '';
        let payload = {
            id: userExist.id,
            email: userExist.email,
            name:userExist.name
        }

        let token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24
        }).status(200).json({ message: "User login successfully", success: true,user:payload });
        
    } catch (error) {
        next(error);
    }
}

type DecodedTokenType = {
    id: string;
    email: string;
    name: string;
    iat: number;
    exp: number;
}



export const getProfile = async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {

        let token = req.cookies.token;

        let decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedTokenType;

        let userDetails = await userModel.findOne({_id:decodedToken.id},{password:0});
        if (!userDetails) {
            res.status(400).json({ message: "Cannot get the user Profile details" });
            return;
        }

        res.status(200).json({ message: "profile details fetched successfully" ,user:userDetails});
        
    } catch (error) {
        next(error);
    }
}


export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    try {

        res.clearCookie('token');
        res.status(200).json({ message: "logout successfully" });
        
    } catch (error) {
        next(error);
    }
}