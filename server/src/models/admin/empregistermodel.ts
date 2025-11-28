import mongoose from "mongoose";

export interface IEmpregister extends Document {
    empName: string,
    empEmail: string,
    empAddress: string,
    empMobile: string,
    empType: 'cleaner' | 'driver',
    admin: mongoose.Schema.Types.ObjectId
}

const empRegisterModel = new mongoose.Schema<IEmpregister>({
    empName: {
        type: String,
        required: true,
    },
    empEmail: {
        type: String,
        required: true,
        unique: true
    },
    empMobile: {
        type: String,
        required: true,
        unique: true
    }, 
    empAddress : {
        type: String,
        required: true
    },
    admin : {
        type: mongoose.Schema.ObjectId,
        ref: 'Auth',
        required: true
    },
    empType: {
        type: String,
        enum: ['cleaner', 'driver'],
        required: true
    }
})

export default mongoose.model<IEmpregister>('EmployeeRegister', empRegisterModel)