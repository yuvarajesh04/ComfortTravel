import express from 'express'
import { authMiddleware } from '../../middleware/authMiddleware'
import empregisterController from '../../controllers/admin/empregisterController'

const router = express()

router.post('/new-employee', authMiddleware, empregisterController.registerEmployee);
router.get('/get-all/:id', authMiddleware, empregisterController.getAllEmployee);

export default router