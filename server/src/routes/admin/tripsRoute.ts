import express from 'express'
import tripsController from '../../controllers/admin/tripsController'
import { authMiddleware } from '../../middleware/authMiddleware'

const router = express.Router()

router.post('/update/:id', authMiddleware, tripsController.updateTrip);

router.get('/by-date/:id', authMiddleware, tripsController.getAvailableTripsDetails);

router.put('/update-emp/:id', authMiddleware, tripsController.updateEmpDetails);

export default router