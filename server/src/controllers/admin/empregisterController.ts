import { Request, Response } from "express"
import EmployeeRegister from "../../models/admin/empregistermodel"
import { IEmpregister } from "../../models/admin/empregistermodel"


const empregisterController = {
    registerEmployee: async (req: Request<{}, {}, IEmpregister>, res: Response): Promise<any> => {
        try {
            const { empName, empEmail, empAddress, empMobile, admin, empType } = req.body;

            // Validate required fields
            if (!empName || !empEmail || !empAddress || !empMobile || !admin || !empType) {
                return res.status(400).json({ success: false, message: 'Please give all required fields' });
            }

            // Check if employee email already exists
            const isExistEmployee = await EmployeeRegister.findOne({ empEmail });
            if (isExistEmployee) {
                return res.status(400).json({ success: false, message: 'Employee already exists!' });
            }

            // Create new employee
            const newEmp = new EmployeeRegister({
                empName,
                empEmail,
                empAddress,
                empMobile,
                admin,
                empType
            });

            await newEmp.save();

            return res.status(201).json({
                success: true,
                message: 'Employee registered successfully',
                employee: newEmp
            });

        } catch (error: any) {
            console.error('Employee registration error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    // Get all employee
    getAllEmployee: async (req: Request, res: Response): Promise<any> => {
        try {
            const adminId = req?.params?.id;

            if (!adminId)
                res.status(400).json({
                    success: false,
                    message: 'Admin Id required'
                })

            const employees = await EmployeeRegister.find({ admin: adminId })

            if (!employees)
                res.status(400).json({ success: false, message: 'Not found' })

            res.status(200).json({
                success: true,
                message: 'Employees retrived success',
                employees
            })

        } catch (error: any) {
            console.error('Get all employees:', error?.message);
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}

export default empregisterController;
