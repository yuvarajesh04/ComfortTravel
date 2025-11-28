import express from 'express'
import authController from '../controllers/authController'

const router = express.Router()

router.post('/registration', authController.registerUser);
router.post('/login', authController.login);

export default router