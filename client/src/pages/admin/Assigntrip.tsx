import React, { Activity } from "react";
import { type IEmployeeData } from "../../component/forms/admin/AddEmployeeForm";
import empApi from "../../services/admin/empApi";
import Navbar from "../../component/Navbar";
import { Container } from "react-bootstrap";
import tripsApi from "../../services/admin/tripsApi";
import { AvailableTripsTable } from "../../component/tables/admin/AvailableTripsTable";
import type { ITripFormData } from "../../component/forms/admin/AddNewTripForm";
import { AvailableEmpTable } from "../../component/tables/admin/AvailableEmpTable";
import { AssignTripForm } from "../../component/forms/admin/AssignTripForm";

export const AssignTrip = () => {

    const [employees, setEmployees] = React.useState<IEmployeeData[]>();

    const [loading, setLoading] = React.useState<boolean>(false);

    const [availableTrips, setAvailableTrips] = React.useState<ITripFormData[]>();

    const [selectedTrip, setSelectedTrip] = React.useState<ITripFormData | null>(null);

    const user = JSON.parse(localStorage.getItem('user') as string);

    async function getAvailableTrips(adminId: string) {
        setLoading(true)
        try {
            const res = await tripsApi.getTripsByDate(adminId);

            if (res?.success) {

                setAvailableTrips(res?.allTrips)

                setLoading(false);
            }

        } catch (error: any) {

            console.error('Get trips:', error);

            setLoading(false)

            return
        }
    }

    async function getEmployee(adminId: string) {
        setLoading(true)
        try {
            const res = await empApi.getAllEmployee(adminId);

            if (res?.success) {
                setEmployees(res.employees)
                setLoading(false);
            }

        } catch (error: any) {
            console.error('Get Employee:', error);
            setLoading(false)
            return
        }
    }

    React.useEffect(() => {
        getEmployee(user?._id);
        getAvailableTrips(user?._id)
    }, [])

    return (
        <div className="assigntrip-container">
            <Navbar />
            <Container className="my-4">
                <h4>Available Trips</h4>
                {loading ? <h2>Loading...</h2> : !availableTrips ? 'No Trips Available' : <AvailableTripsTable trips={availableTrips} onSelectTrip={(trip) => setSelectedTrip(trip)} />}

                <h4>Available Employees</h4>
                {loading ? <h2>Loading...</h2> : !employees ? 'No employees Available' : <AvailableEmpTable employees={employees} />}

                <Activity mode={selectedTrip ? 'visible' : 'hidden'}>
                    <AssignTripForm trip={selectedTrip} employees={employees} />
                </Activity>
            </Container>
        </div>
    )
}