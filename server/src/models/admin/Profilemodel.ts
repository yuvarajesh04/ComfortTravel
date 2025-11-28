import mongoose from "mongoose";

export interface IProfile extends Document {
    user: mongoose.Schema.Types.ObjectId,
    companyName: string,
    dob: string,
    address: string,
    aadharNumber: string,
    panNumber: string,
    totalBus: number
}

const profileSchema = new mongoose.Schema<IProfile>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    aadharNumber: {
        type: String,
        required: true,
        unique: true
    },
    panNumber: {
        type: String,
        required: true,
        unique: true
    },
    totalBus: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const AdminProfile = mongoose.model('AdminProfile', profileSchema)

export default AdminProfile