import { Request, Response } from "express";
import Trips from "../../models/admin/Tripsmodel";

const tripsController = {

    // Update Trip
    updateTrip: async (req: Request, res: Response): Promise<any> => {
        try {

            const userId = req.params.id;

            if (!userId)
                res.status(401).json({ success: false, message: 'User id not found' })

            const {
                from,
                to,
                startTime,
                endTime,
                travelTime,
                stops,
                ticketPricing,
                registrationnum,
                color,
                seatType,
                totalSeats,
                tripDate
            } = req.body;

            // Validate Required Fields
            if (!from || !to || !startTime || !endTime || !travelTime || !registrationnum || !color || !seatType || !totalSeats) {
                return res.status(400).json({ message: "All required fields must be filled." });
            }

            // Update document
            const updatedTrip = await Trips.findOneAndUpdate(
                { user: userId },
                {
                    from,
                    to,
                    startTime,
                    endTime,
                    travelTime,
                    stops,
                    ticketPricing,
                    registrationnum,
                    color,
                    seatType,
                    totalSeats,
                    tripDate
                },
                { new: true, upsert: true }
            );

            if (!updatedTrip) {
                return res.status(404).json({ message: "Trip not found." });
            }

            return res.status(201).json({
                success: true,
                message: "Trip updated successfully.",
                trips: updatedTrip,
            });

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    },

    // Get available trips details by running and future trips
    getAvailableTripsDetails: async (req: Request, res: Response): Promise<any> => {
        try {
            const adminId: string = req.params.id;

            if (!adminId)
                res.status(400).json({ success: false, message: 'Admin id not found!' })

            const allTrips = await Trips.find({ user: adminId }).select('-user');

            if (!allTrips)
                res.status(400).json({ success: false, message: 'No trips available!' })

            console.log('All trips here', allTrips)

            res.status(200).json({
                success: true,
                message: 'All trips retrived success!!',
                allTrips
            })

        } catch (error: any) {
            console.error('Get available trips:', error)
            res.status(500).json({ success: false, message: 'Internal server error', error: error?.message })
        }
    },

    // Update employee details
    updateEmpDetails: async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;

            const { driverId, cleanerId, tripId } = req.body;

            if (!driverId || !cleanerId)
                res.status(400).json({ success: false, message: 'Driver id and cleaner id required!' })

            const updatedTrip = await Trips.findByIdAndUpdate(tripId,
                { $set: { "emp.driver": driverId, "emp.cleaner": cleanerId, "isAssigned": true } },
                { new: true }
            )

            if (!updatedTrip)
                res.status(404).json({
                    success: false,
                    message: "Trip not found!",
                });

            res.status(200).json({
                success: true,
                message: "Employee details updated successfully!",
                data: updatedTrip,
            });

        } catch (error: any) {
            console.error("Update employee details error:", error);
            res.status(500).json({
                success: false,
                message: "Server error while updating employee details",
                error: error.message,
            });
        }
    }
};

export default tripsController;
