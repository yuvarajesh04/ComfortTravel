import axios from "axios"
import type { IProfile } from "../../pages/admin/Profile"

const BASE_URL = import.meta.env.BASE_URL_ADMIN || 'http://localhost:5000/api/admin'

export const profileApi = {
    saveProfile: async (profileData: IProfile) => {
        try {
            const res = await axios.post(`${BASE_URL}/profile/update`, profileData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return res.data
        } catch (error) {
            console.error('Save profile error', error)
            return
        }
    },

    // fetch admin profile
    fetchAdminProfile: async (id: string): Promise<any> => {
        try {
            const res = await axios.get(`${BASE_URL}/profile/get-profile/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return res.data
        } catch (error) {
            console.error(error)
            return
        }
    }
}