import type React from 'react'
import type { IEmployeeData } from '../../forms/admin/AddEmployeeForm'
import { Table } from 'react-bootstrap'

interface AvailableEmpTableProps {
    employees: IEmployeeData[]
}

export const AvailableEmpTable: React.FC<AvailableEmpTableProps> = ({ employees }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <td>S.NO</td>
                    <td>Emp Name</td>
                    <td>Email</td>
                    <td>Mobile</td>
                    <td>EmpType</td>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp: IEmployeeData, index: number) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{emp.empName}</td>
                        <td>{emp.empEmail}</td>
                        <td>{emp.empMobile}</td>
                        <td>{emp.empType}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}