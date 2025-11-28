import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import type { ITripFormData } from "./AddNewTripForm";
import type { IEmployeeData } from "./AddEmployeeForm";
import { useForm } from 'react-hook-form'
import tripsApi from "../../../services/admin/tripsApi";

export interface AssignTripFormProps {
    trip?: ITripFormData | null;
    employees?: IEmployeeData[];
    EmployeeData?: EmployeeData
}

export interface EmployeeData {
    adminId?: string,
    driverName?: string,
    cleanerName?: string
}

export const AssignTripForm: React.FC<AssignTripFormProps> = ({ trip, employees }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployeeData>();

    const admin = JSON.parse(localStorage.getItem('user') as string);

    React.useEffect(() => {

        if (!trip) throw new Error("Trip not found");

        console.log(trip);

    }, [trip]);

    const driverList = employees?.filter(emp => emp.empType === "driver") || [];

    const cleanerList = employees?.filter(emp => emp.empType === "cleaner") || [];

    async function handleFormSubmit(data: EmployeeData) {
        try {
            const adminId = admin._id;

            if (!adminId)
                throw new Error('Admin Id not found')

            const driver = driverList.find((driver) => driver.empName === data?.driverName);
            const cleaner = cleanerList.find((cleaner) => cleaner.empName === data?.cleanerName);

            const driverId = driver?._id;
            const cleanerId = cleaner?._id;
            const tripId = trip?._id;

            const response = await tripsApi.updateEmpDeatilsForTrip(driverId!, cleanerId!, adminId, tripId!);

            if (response?.success) {
                alert('Trip assigned success with Employees!!')
                reset()
            }

        } catch (error: any) {
            console.error(error)
        }
    }

    return (
        <div className="assign-trip-container">
            {trip && (
                <Form className="p-3 rounded" onSubmit={handleSubmit(handleFormSubmit)} style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
                    <h5 className="text-center fw-semibold">Assign Trip with Employees</h5>
                    <Row>
                        <Col md={6} sm={12} lg={6}>
                            <Form.Group className="mb-1">
                                <Form.Label>Trip</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={trip.registrationnum}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} sm={12} lg={6}>
                            <Form.Group className="mb-1">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    disabled
                                    value={
                                        trip.tripDate
                                            ? new Date(trip.tripDate).toISOString().split("T")[0]
                                            : ""
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} sm={12} lg={6}>
                            <Form.Group className="mb-1">
                                <Form.Label>From</Form.Label>
                                <Form.Control type="text" disabled value={trip.from || ""} />
                            </Form.Group>
                        </Col>
                        <Col md={6} sm={12} lg={6}>
                            <Form.Group className="mb-1">
                                <Form.Label>To</Form.Label>
                                <Form.Control type="text" disabled value={trip.to || ""} />
                            </Form.Group>
                        </Col>

                        {/* ✅ Driver Select */}
                        <Col md={6} sm={12} lg={6}>
                            <Form.Group className="mb-1">
                                <Form.Label>Select Driver</Form.Label>
                                <Form.Select
                                    {...register('driverName', { required: true })}
                                >
                                    <option value="">-- Select Driver --</option>
                                    {driverList.length > 0 ? (
                                        driverList.map((emp, index) => (
                                            <option key={index} value={emp.empName}>
                                                {emp.empName}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No drivers available</option>
                                    )}
                                </Form.Select>
                                {errors.driverName && <p className="14 text-danger">{errors.driverName?.message}</p>}
                            </Form.Group>
                        </Col>

                        {/* ✅ Cleaner Select */}
                        <Col md={6} sm={12} lg={6}>
                            <Form.Group className="mb-1">
                                <Form.Label>Select Cleaner</Form.Label>
                                <Form.Select
                                    {...register('cleanerName', { required: true })}
                                >
                                    <option value="">-- Select Cleaner --</option>
                                    {cleanerList.length > 0 ? (
                                        cleanerList.map((emp, index) => (
                                            <option key={index} value={emp.empName}>
                                                {emp.empName}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No cleaners available</option>
                                    )}
                                </Form.Select>
                                {errors.cleanerName && <p className="14 text-danger">{errors.cleanerName?.message}</p>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button
                        type="submit"
                        className="w-100 bg-white my-2"
                        style={{
                            border: "2px solid var(--primary-color)",
                            color: "var(--primary-color)",
                        }}
                    >
                        Assign Trip
                    </Button>
                </Form>
            )}
        </div>
    );
};
