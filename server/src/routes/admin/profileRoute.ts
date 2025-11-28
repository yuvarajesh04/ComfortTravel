import express from 'express'
import { authMiddleware } from '../../middleware/authMiddleware'
import profileController from '../../controllers/admin/profileController'

const route = express.Router()

route.post('/update', authMiddleware, profileController.updateProfile)
route.get('/get-profile/:id', authMiddleware, profileController.fetchAdminProfile)

export default route