import Navbar from "../../component/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { DashboardCard } from "../../component/cards/admin/DashboardCard";
import React from "react";
import tripsApi from "../../services/admin/tripsApi";
import { type ITripFormData } from "../../component/forms/admin/AddNewTripForm";
import { ManageTripCard } from "../../component/cards/admin/ManageTripCard";

const data = [{ value: 3, title: 'Total Busses' }, { value: 40, title: 'Today Earning' }, { value: 4000, title: 'Month Earning' }]

export const Home: React.FC = () => {

  const [trips, setTrips] = React.useState<ITripFormData[] | null>(null);

  const [loading, setLoading] = React.useState<boolean>(false);

  async function getAvailableTrips() {
    setLoading(true)
    try {
      const user = JSON.parse(localStorage.getItem('user') as string);

      const id: string = user._id;

      const response = await tripsApi.getTripsByDate(id);

      setTrips(response?.allTrips)

      setLoading(false)

    } catch (error: any) {
      console.error(error.message as string);
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getAvailableTrips();
  }, [])

  return (
    <div className="home-container">
      <Navbar />
      <Container className="mt-4">
        <Row className="g-3">
          {data.map((d) => (
            <Col md={4} sm={12} lg={4} key={d.title}>
              <DashboardCard title={d.title} value={d.value} />
            </Col>
          ))}
        </Row>
        <Row className="manage-trips my-4">
          <h4 className="fw-semibold">Manage Trips</h4>
          {loading ? (<h6>Loading ...</h6>) : !trips ? (<h5>No Trips Found!!</h5>) : (
            trips.map((trip) => (
              <Col md={6} sm={12} lg={4}>
                <ManageTripCard trip={trip} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}