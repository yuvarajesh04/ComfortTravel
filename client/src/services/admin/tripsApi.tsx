import axios from "axios"
import { type ITripFormData } from "../../component/forms/admin/AddNewTripForm"

const BASE_URL = import.meta.env.BASE_URL_ADMIN || 'http://localhost:5000/api/admin'

const tripsApi = {

    // Create new trip
    addNewTrip: async (data: ITripFormData, id: string) => {
        try {

            if (!id)
                throw new Error('Id not found in add new trip api')

            const response = await axios.post(`${BASE_URL}/trip/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })

            return response.data
        } catch (error) {
            console.log(error)
            return
        }
    },

    // Get Available trips
    getTripsByDate: async (id: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/trip/by-date/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return response.data
        } catch (error: any) {
            console.log('Get trips by date error', error)
            return
        }
    },

    // Update employee information for the trip
    updateEmpDeatilsForTrip: async (driverId: string, cleanerId: string, adminId: string, tripId: string) => {
        try {
            if (!driverId || !cleanerId || !adminId)
                throw new Error("Id not found");

            const response = await axios.put(`${BASE_URL}/trip/update-emp/${adminId}`, { driverId, cleanerId, tripId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return response.data

        } catch (error: any) {
            throw new Error('Update employee error');
        }
    }
}

export default tripsApi