import React from "react";
import { Form, Button } from "react-bootstrap"
import { useForm } from 'react-hook-form'
// import '../../../styles/admin/addemployeeregisterform.css'
import empApi from "../../../services/admin/empApi";

export interface  IEmployeeData {
    _id?: string,
    empName: string,
    empEmail: string,
    empMobile: string,
    admin: string,
    empAddress: string,
    empType: 'driver' | 'cleaner'
}

interface AddEmployeeFormProps {
    setIsAddEmployeeForm: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddEmployeeForm = ({ setIsAddEmployeeForm }: AddEmployeeFormProps) => {

    const user = JSON.parse(localStorage.getItem('user') as string);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IEmployeeData>();

    const [loading, setLoading] = React.useState<boolean>(false);

    const onSubmit = async (data: IEmployeeData) => {

        setLoading(true)

        try {
            data.admin = user?._id as string;

            const res = await empApi.registerEmp(data);

            if (res?.success) {
                console.log('Employee added success!')
                reset()
                setIsAddEmployeeForm(false)
            }

        } catch (error: any) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="addemployee-registerform d-flex justify-content-center">
            <Form className="shadow-sm p-2 rounded w-100" onSubmit={handleSubmit(onSubmit)} style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                <h3 className="text-center" style={{ color: 'var(--primary-color)' }}>Add New Employee</h3>
                <Form.Group className="mb-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="John Doe" {...register('empName', { required: 'Required Field' })} />
                    {errors.empName && <p className="fs-14 text-danger">{errors?.empName?.message}</p>}
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="JohnDoe@example.com" {...register('empEmail', {
                        required: 'Required Field', pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    })} />
                    {errors.empEmail && <p className="fs-14 text-danger">{errors?.empEmail?.message}</p>}
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="text" placeholder="7825025408" {...register('empMobile', { required: 'Required Field' })} />
                    {errors?.empMobile && <p className="fs-14 text-danger">{errors?.empMobile?.message}</p>}
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="North street, Chennai ..." {...register('empAddress', { required: 'Required Field' })} />
                    {errors.empAddress && <p className="fs-14 text-danger">{errors?.empAddress?.message}</p>}
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>type</Form.Label>
                    <Form.Select {...register('empType', { required: 'Required field' })}>
                        <option value="driver">Driver</option>
                        <option value="cleaner">Cleaner</option>
                    </Form.Select>
                </Form.Group>

                <Button type="submit" disabled={loading} className="w-100" style={{ color: 'var(--primary-color)', border: '2px solid var(--primary-color)', backgroundColor: '#fff' }}>{loading ? 'Submitting...' : 'Submit'}</Button>
            </Form>
        </div>
    )
}