import axios from 'axios'
import { type IEmployeeData } from '../../component/forms/admin/AddEmployeeForm'

const BASE_URL = import.meta.env.BASE_URL_ADMIN || 'http://localhost:5000/api/admin'

const empApi = {
    registerEmp: async (data: IEmployeeData) => {
        try {
            const response = await axios.post(`${BASE_URL}/employee/new-employee`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return response.data;

        } catch (error: any) {
            console.log(error)
            return
        }
    },

    // Get all employee
    getAllEmployee: async (adminId: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/employee/get-all/${adminId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return response.data
        } catch (error: any) {
            console.error('Get all employee error:', error);
            return
        }
    }
}

export default empApi