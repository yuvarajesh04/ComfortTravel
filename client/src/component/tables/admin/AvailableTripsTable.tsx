import { Button, Table } from "react-bootstrap"
import { type ITripFormData } from "../../forms/admin/AddNewTripForm"
import React from "react"

interface AvailableTripsTableProps {
    trips?: ITripFormData[],
    onSelectTrip: (trip: ITripFormData) => void;
}

export const AvailableTripsTable: React.FC<AvailableTripsTableProps> = ({ trips, onSelectTrip }) => {

    return (
        <div className="available-trip-table-container">

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Reg No</th>
                        <th>Seat Type</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Trip Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {trips && trips.map((trip, index) => (
                        <tr key={trip?._id || index}>
                            <td>{index + 1}</td>
                            <td>{trip.from}</td>
                            <td>{trip.to}</td>
                            <td>{trip.registrationnum}</td>
                            <td>{trip.seatType}</td>
                            <td>{trip.startTime}</td>
                            <td>{trip.endTime}</td>
                            <td>{new Date(trip.tripDate).toLocaleDateString()}</td>
                            <td><Button disabled={trip.isAssigned} onClick={() => onSelectTrip(trip)}>{trip?.isAssigned ? 'Cancel' : 'Assign'}</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    )
}