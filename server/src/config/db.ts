import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export async function connectToDataBase() {
    let mongooUrl: string = process.env.MONGO_URI!;

    if (!mongooUrl) {
        console.warn('Mongo url not found in .env!')
        mongooUrl = "mongodb://localhost:27017/ComfortTravel"
    }


    await mongoose.connect(mongooUrl)
        .then(()=> console.log("Mongoo db connected success!!"))
        .catch((error) => `Mongoo db connection error: ${error.message}`)
}