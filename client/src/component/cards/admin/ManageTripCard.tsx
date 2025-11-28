import { Button, Card } from "react-bootstrap"
import { type ITripFormData } from "../../forms/admin/AddNewTripForm"
import type React from "react"
import { useNavigate } from "react-router-dom"

interface ManageTripCardProps {
    trip: ITripFormData
}

export const ManageTripCard: React.FC<ManageTripCardProps> = ({ trip }) => {

    const navigate = useNavigate();

    return (
        <Card className="shadow-sm p-1 rounded" style={{ border: '2px solid var(--primary-color)' }}>
            <Card.Body>
                <Card.Title>{trip.registrationnum}</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                    <Card.Text className="my-1">From : {trip.from}</Card.Text>
                    <Card.Text className="my-1">To : {trip.to}</Card.Text>
                </div>
                <Card.Text className="my-1">Date : {new Date(trip.tripDate).toLocaleDateString()}</Card.Text>
                <Card.Text className="my-1">Seat Type : {trip?.seatType}</Card.Text>
                <Card.Text className="my-1">Total Seats : {trip?.totalSeats}</Card.Text>
                <Card.Text className="my-1">IsAssigned : { trip?.isAssigned ? 'Yes' : 'No' }</Card.Text>
                <Button className="w-100 mt-2 border-0" style={{ backgroundColor: 'var(--primary-color)' }} onClick={()=> navigate(`/admin/manage-trip/${trip?._id}`)}>Manage Trip</Button>
            </Card.Body>
        </Card>
    )
}