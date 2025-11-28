import mongoose from "mongoose";

export interface IAuth extends Document {
    name: string,
    email: string,
    password: string,
    userType: "admin" | "user"
}

const AuthModel = new mongoose.Schema<IAuth>({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    }
}, { timestamps: true })

const Auth = mongoose.model<IAuth>("Auth", AuthModel)

export default Auth