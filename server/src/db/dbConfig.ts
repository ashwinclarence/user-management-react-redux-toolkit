


import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING!)

        console.log("Mongodb connected successfully");
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}