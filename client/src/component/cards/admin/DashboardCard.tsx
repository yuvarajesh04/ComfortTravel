import React from "react";
import { Card } from "react-bootstrap";

interface DashboardCardProps {
    title: string;
    value: string | number;
    bgColor?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, bgColor }) => {
    return (
        <Card className={`shadow-sm p-3 text-center bg-${bgColor}`} style={{ borderRadius: "12px" }}>
            <Card.Body>
                <Card.Title style={{ fontSize: "18px", fontWeight: 600 }}>
                    {title}
                </Card.Title>
                <h3 style={{ color: "var(--primary-color)", fontWeight: 700 }}>
                    {value}
                </h3>
            </Card.Body>
        </Card>
    );
};
