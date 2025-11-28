import React, { useEffect } from "react"
import Navbar from "../../component/Navbar"
import { Container, Form, Row, Col, Button } from "react-bootstrap"
import '../../styles/admin/profile.css'
import { profileApi } from "../../services/admin/profileApi"

export interface IProfile {
    name: string,
    companyName?: string,
    dob?: string,
    email?: string,
    address?: string,
    aadharNumber?: string,
    panNumber?: string,
    totalBus?: number
}

export const Profile = () => {
    const [profile, setProfile] = React.useState<IProfile>({
        name: '',
        companyName: '',
        dob: '',
        email: '',
        address: '',
        aadharNumber: '',
        panNumber: '',
        totalBus: 0
    });
    const [isEdit, setIsEdit] = React.useState<boolean>(true);

    const localUser = localStorage.getItem('user');

    const user = localUser ? JSON.parse(localUser) : null;

    async function getAdminProfile(id: string) {
        try {
            const response = await profileApi.fetchAdminProfile(id);

            if (response.success && response.profileData) {
                const { user, companyName, dob, address, aadharNumber, panNumber, totalBus } = response.profileData;

                setProfile({
                    name: user?.name || "",
                    email: user?.email || "",
                    companyName: companyName || "",
                    dob: dob || "",
                    address: address || "",
                    aadharNumber: aadharNumber || "",
                    panNumber: panNumber || "",
                    totalBus: totalBus || 0,
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user?._id) {
            getAdminProfile(user._id);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("Profile data:", profile);

            const res = await profileApi.saveProfile(profile);

            if (res.success) {
                alert('Profile updated success!!')
                setIsEdit(true);
            }

        } catch (error) {
            console.error('Profile update error', error)
        }
    };

    return (
        <div className="profile-container">
            <Navbar />
            <Container>
                <Form className="bg-white p-4 rounded shadow-sm  my-4" onSubmit={handleSubmit}>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 style={{ color: "var(--primary-color)" }}>User Profile</h3>
                        <Button
                            title="Edit Profile"
                            onClick={() => setIsEdit(!isEdit)}
                            style={{
                                backgroundColor: "var(--primary-color)",
                                borderColor: "var(--primary-color)",
                                color: "white",
                            }}
                            size="sm"
                        >
                            <span className="px-1">{isEdit ? 'Edit' : 'Cancel'}</span>
                            <i className="bi bi-pencil"></i>
                        </Button>
                    </div>

                    <Row className="mb-3">
                        <Col md={6} sm={12}>
                            <Form.Group controlId="formName" className="my-2">
                                <Form.Label>FullName</Form.Label>
                                <Form.Control type="text" name="name" value={profile?.name} disabled={true} />
                            </Form.Group>
                        </Col>
                        <Col md={6} sm={12}>
                            <Form.Group controlId="formEmail" className="my-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" value={profile?.email} disabled={true} />
                            </Form.Group>
                        </Col>
                        <Col md={6} sm={12}>
                            <Form.Group controlId="formCompanyName" className="my-2">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control type="text" onChange={handleChange} name="companyName" value={profile?.companyName} disabled={isEdit} />
                            </Form.Group>
                        </Col>
                        <Col md={6} sm={12}>
                            <Form.Group controlId="formDate" className="my-2">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="text" onChange={handleChange} name="dob" value={profile?.dob} disabled={isEdit} placeholder="DD-MM-YYYY" />
                            </Form.Group>
                        </Col>
                        <Col md={6} sm={12}>
                            <Form.Group controlId="formAadhar" className="my-2">
                                <Form.Label>Aadhar No</Form.Label>
                                <Form.Control type="text" disabled={isEdit} onChange={handleChange} value={profile?.aadharNumber} name="aadharNumber" placeholder="XXXX XXXX XXXX" />
                            </Form.Group>
                        </Col>
                        <Col md={6} sm={12}>
                            <Form.Group controlId="formPan" className="my-2">
                                <Form.Label>Pan No</Form.Label>
                                <Form.Control type="text" disabled={isEdit} onChange={handleChange} value={profile?.panNumber} name="panNumber" placeholder="BHTPY1835L" />
                            </Form.Group>
                        </Col>
                        <Col md={6} sm={12}>
                            <Form.Group controlId="formAddress" className="my-2">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" disabled={isEdit} value={profile?.address} onChange={handleChange} name="address" placeholder="No.10, north street etc.." />
                            </Form.Group>
                        </Col>
                        <Col md={6} sm={12}>
                            <Form.Group controlId="formBus" className="my-2">
                                <Form.Label>Total Bus</Form.Label>
                                <Form.Control type="number" onChange={handleChange} value={profile?.totalBus} name="totalBus" disabled={isEdit} placeholder="10" />
                            </Form.Group>
                        </Col>
                        <Col md={12} sm={12}>
                            <Form.Group controlId="formSubmit" className="mt-4">
                                <Form.Control type="submit" className="save-form" disabled={isEdit} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}