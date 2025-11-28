import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

// Custom imports
import { connectToDataBase } from './config/db'
import authRouter from './routes/authRoutes'
import adminProfileRoute from './routes/admin/profileRoute'
import tripRouter from './routes/admin/tripsRoute'
import addEmpRouter from './routes/admin/employeeRoute'

dotenv.config()

const app = express()

app.use(cors({origin: '*'}));

app.use(express.json())

// Logs like: GET /test 200 205.34 ms
app.use(morgan(":method :url :status :response-time ms"));

// db connection
connectToDataBase()

// routes
app.use('/api/auth', authRouter);

// admin routes
app.use('/api/admin/profile', adminProfileRoute)
app.use('/api/admin/trip', tripRouter)
app.use('/api/admin/employee', addEmpRouter)

const PORT = process.env.PORT || '5001'

// Start server
app.listen(PORT, ()=> {
    console.info('Server running on port', PORT)
})