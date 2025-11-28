import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import Navbar from "../../component/Navbar"
import { DashboardCard } from "../../component/cards/admin/DashboardCard"
import { AddNewTripForm } from "../../component/forms/admin/AddNewTripForm"
import { AddEmployeeForm } from "../../component/forms/admin/AddEmployeeForm"

const data = [{ value: 3, title: 'Today trips', bgColor: 'primary' }, { value: 40, title: 'Completed Trips', bgColor: 'success' }, { value: 4000, title: 'Pending Trips', bgColor: 'warning' }]

const Trips: React.FC = () => {

    const [isNewTrip, setIsNewTrip] = React.useState<boolean>(false);

    const [isAddEmployeeForm, setIsAddEmployeeForm] = React.useState<boolean>(false);


    return (
        <div className="trips-container">
            <Navbar />
            <Container className="my-4">
                <Row className="g-3">
                    {data.map((d) => (
                        <Col md={4} sm={12} lg={4} key={d.title}>
                            <DashboardCard title={d.title} value={d.value} bgColor={d.bgColor} />
                        </Col>
                    ))}
                </Row>

                {/* Add new trip and add bus details button */}
                <Row>
                    <Col md={6} lg={6} sm={6}>
                        <button className="my-4 w-100 p-2 border-0 rounded fw-semibold text-white" onClick={() => setIsAddEmployeeForm(!isAddEmployeeForm)} style={{ backgroundColor: 'var(--primary-color)' }}>
                            {isAddEmployeeForm ? 'Cancel' : 'Add New Employee'}
                        </button>
                    </Col>
                    <Col md={6} lg={6} sm={6}>
                        <button className="my-4 w-100 p-2 border-0 rounded fw-semibold text-white" onClick={() => setIsNewTrip(!isNewTrip)} style={{ backgroundColor: 'var(--primary-color)' }}>
                            {isNewTrip ? 'Cancel Trip' : 'Add New Trip'}
                        </button>
                    </Col>
                </Row>

                {/* New trip form */}
                {isNewTrip && <AddNewTripForm />}

                {/* Add employee form data */}
                {isAddEmployeeForm && <AddEmployeeForm setIsAddEmployeeForm={setIsAddEmployeeForm} />}

            </Container>
        </div>
    )
}

export default Trips