import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import tripsApi from "../../../services/admin/tripsApi";

export interface Stop {
    name: string;
    pickup?: string;
    drop?: string;
    price?: number;
    time?: string;
};

export interface ITripFormData {
    _id?: string,
    from: string;
    to: string;
    startTime: string;
    endTime: string;
    travelTime: string;
    dateController: Date;
    stops?: Stop[];
    ticketPricing?: {
        pickup: string;
        drop: string;
        price: string;
    }[];
    registrationnum: string;
    color: string;
    seatType: 'Seater' | 'Semi Sleeper' | 'Sleeper';
    totalSeats: string;
    tripDate: Date;
    isAssigned?:boolean
};


export const AddNewTripForm: React.FC = () => {

    const { register, handleSubmit, control, formState: { errors }, watch, reset } = useForm<ITripFormData>();

    const [isAddStopDetails, setIsAddStopDetails] = React.useState<boolean>(false);

    const [isAddTicketPricing, setIsAddTickedPricing] = React.useState<boolean>(false);

    const user = JSON.parse(localStorage.getItem("user") as string);

    // Dynamic Stops Fields
    const { fields, append, remove } = useFieldArray({
        control,
        name: "stops"   // Array name
    });

    const {
        fields: pricingFields,
        append: appendPricing,
        remove: removePricing
    } = useFieldArray({
        control,
        name: "ticketPricing"
    });


    const stops = watch('stops');

    // Submit
    async function handleFormSubmit(data: ITripFormData) {
        console.log("Form Data:", data);

        const res = await tripsApi.addNewTrip(data, user?._id as string);

        if (res?.success) {
            alert('Trip added Success!!')
            reset()
            setIsAddStopDetails(false)
            setIsAddTickedPricing(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit(handleFormSubmit)} className="p-3 rounded my-2" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>

            <h2 className="text-center mb-2">Add New Trip</h2>

            {/* Trip Details */}
            <h4 className="fw-semibold" style={{ color: 'var(--primary-color)' }}>Trip Details</h4>
            <Row>
                <Col lg={6} md={6} sm={12}>
                    <Form.Group>
                        <Form.Label>From</Form.Label>
                        <Form.Control className="mb-2" type="text" placeholder="Chennai" {...register("from", { required: 'Required Field' })} />
                        {errors.from && <p className="text-danger fs-14">{errors.from.message as string}</p>}
                    </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                    <Form.Group>
                        <Form.Label>To</Form.Label>
                        <Form.Control className="mb-2" type="text" placeholder="Madurai" {...register("to", { required: 'Required Field' })} />
                        {errors.to && <p className="text-danger fs-14">{errors.to.message as string}</p>}
                    </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                    <Form.Group>
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control className="mb-2" type="text" placeholder="10:00 AM" {...register("startTime", { required: 'Required Field' })} />
                        {errors.startTime && <p className="text-danger fs-14">{errors.startTime.message as string}</p>}
                    </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                    <Form.Group>
                        <Form.Label>End Time</Form.Label>
                        <Form.Control className="mb-2" type="text" placeholder="10:00 PM" {...register("endTime", { required: 'Required Field' })} />
                        {errors.endTime && <p className="text-danger fs-14">{errors.endTime.message as string}</p>}
                    </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                    <Form.Group>
                        <Form.Label>Trip Date</Form.Label>
                        <Form.Control className="mb-2" type="date" {...register("tripDate", { required: 'Required Field' })} />
                        {errors?.tripDate && <p className="text-danger fs-14">{errors?.tripDate.message as string}</p>}
                    </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                    <Form.Group>
                        <Form.Label>Travel Time</Form.Label>
                        <Form.Control className="mb-2" type="text" placeholder="10 HRS" {...register("travelTime", { required: 'Required Field' })} />
                        {errors.travelTime && <p className="text-danger fs-14">{errors.travelTime.message as string}</p>}
                    </Form.Group>
                </Col>

                <Col lg={12} md={12} sm={12}>
                    <Form.Group>
                        <Button
                            className="w-100 bg-white"
                            style={{ border: 'var(--primary-color) 2px solid', color: 'var(--primary-color)' }}
                            onClick={() => {
                                setIsAddStopDetails(!isAddStopDetails);
                                if (!isAddStopDetails) append({ name: "" }); // Add first stop dynamically
                            }}
                        >
                            {isAddStopDetails ? 'Cancel Stop Details' : 'Add Stop Details'}
                        </Button>
                    </Form.Group>
                </Col>

                {isAddStopDetails && fields.map((field, index) => (
                    <Col lg={12} key={field.id} className="mb-2">
                        <div className="d-flex align-items-center gap-2 w-100">

                            {/* Label */}
                            <Form.Label className="mb-0" style={{ minWidth: "100px" }}>
                                Stop {index + 1}
                            </Form.Label>

                            {/* Input expands full width */}
                            <Form.Control
                                className="flex-grow-1 mt-1"
                                type="text"
                                placeholder="Eg: Trichy"
                                {...register(`stops.${index}.name`, { required: "Required Field" })}
                            />

                            <Col lg={4} md={4} sm={12} className="mb-2">
                                <Form.Group>
                                    <Form.Control
                                        className="mt-1"
                                        type="text"
                                        placeholder="10:45 AM"
                                        {...register(`stops.${index}.time`, { required: "Required field" })}
                                    />
                                    {errors.stops?.[index]?.price && (
                                        <p className="text-danger fs-14 mb-0">
                                            {errors.stops[index]?.time?.message}
                                        </p>
                                    )}
                                </Form.Group>
                            </Col>

                            {/* + Add Stop */}
                            <Button variant="outline-primary" size="sm" onClick={() => append({ name: "" })}>
                                +
                            </Button>

                            {/* Remove button (if more than one row) */}
                            {fields.length > 1 && (
                                <Button variant="outline-danger" size="sm" onClick={() => remove(index)}>
                                    ✕
                                </Button>
                            )}
                        </div>

                        {errors.stops?.[index]?.name && (
                            <p className="text-danger fs-14 mb-0">{errors.stops[index]?.name?.message}</p>
                        )}
                    </Col>
                ))}
            </Row>

            {/* Bus Details */}
            <h4 className="fw-semibold mt-3" style={{ color: 'var(--primary-color)' }}>Bus Details</h4>
            <Row>
                <Col lg={6} md={6} sm={12}>
                    <Form.Group>
                        <Form.Label>Bus Registration Number</Form.Label>
                        <Form.Control
                            className="mb-2"
                            type="text"
                            placeholder="TN 10 AY 1835"
                            {...register("registrationnum", {
                                required: "Required Field",
                                pattern: {
                                    value: /^TN\s\d{2}\s[A-Z]{2}\s\d{4}$/,
                                    message: "Invalid format. Example: TN 10 AY 1835"
                                }
                            })}
                        />
                        {errors.registrationnum && <p className="text-danger fs-14">{errors.registrationnum.message as string}</p>}
                    </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                    <Form.Group>
                        <Form.Label>Bus Color</Form.Label>
                        <Form.Control className="mb-2" type="text" placeholder="Green" {...register('color', { required: 'Required field' })} />
                        {errors.color && <p className="text-danger fs-14">{errors.color.message as string}</p>}
                    </Form.Group>
                </Col>

                <Col lg={6} md={6} sm={12}>
                    <Form.Group>
                        <Form.Label>Bus Type</Form.Label>
                        <Form.Select
                            className="mb-2"
                            {...register("seatType", { required: "Required field" })}
                        >
                            <option value="">Select Bus Type</option>
                            <option value="Seater">Seater</option>
                            <option value="Semi Sleeper">Semi Sleeper</option>
                            <option value="Sleeper">Sleeper</option>
                        </Form.Select>

                        {errors.seatType && (
                            <p className="text-danger fs-14">{errors.seatType.message as string}</p>
                        )}
                    </Form.Group>
                </Col>

                <Col md={6} lg={6} sm={12}>
                    <Form.Group>
                        <Form.Label>Total Seats</Form.Label>
                        <Form.Control className="mb-2" type="text" placeholder='0' {...register('totalSeats', { required: 'Required Field' })} />
                        {errors.totalSeats && (
                            <p className="text-danger fs-14">{errors.totalSeats.message as string}</p>
                        )}
                    </Form.Group>
                </Col>
            </Row>

            {/* Ticket Pricing */}
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="fw-semibold mt-3" style={{ color: 'var(--primary-color)' }}>Ticket Pricing</h4>
                <Button
                    style={{ color: 'var(--primary-color)', backgroundColor: '#fff', border: '2px solid var(--primary-color)' }}
                    onClick={() => {
                        setIsAddTickedPricing(!isAddTicketPricing);
                        if (!isAddTicketPricing && pricingFields.length === 0) {
                            appendPricing({ pickup: "", drop: "", price: "" });
                        }
                    }}
                >
                    {isAddTicketPricing ? 'Cancel Ticket Pricing' : 'Add Ticket Pricing'}
                </Button>
            </div>
            <Row>
                {isAddTicketPricing && pricingFields.map((field, index) => (
                    <React.Fragment key={field.id}>

                        {/* Pick Up */}
                        <Col lg={4} md={4} sm={12} className="mb-2">
                            <Form.Group>
                                <Form.Label>Pick Up</Form.Label>
                                <Form.Select
                                    {...register(`ticketPricing.${index}.pickup`, { required: "Required" })}
                                >
                                    <option value="">Select</option>
                                    {stops?.map((s, i) => (
                                        <option key={i} value={s.name}>{s.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Drop */}
                        <Col lg={4} md={4} sm={12} className="mb-2">
                            <Form.Group>
                                <Form.Label>Drop</Form.Label>
                                <Form.Select
                                    {...register(`ticketPricing.${index}.drop`, {
                                        required: "Required",
                                        validate: (value) => {
                                            const pickup = watch(`ticketPricing.${index}.pickup`);
                                            const pickupIndex = stops!.findIndex(s => s.name === pickup);
                                            const dropIndex = stops!.findIndex(s => s.name === value);
                                            return pickupIndex < dropIndex || "Drop must be after Pick Up";
                                        }
                                    })}
                                >
                                    <option value="">Select</option>
                                    {stops?.map((s, i) => (
                                        <option key={i} value={s.name}>{s.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Price */}
                        <Col lg={3} md={3} sm={12} className="mb-2">
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Eg: 250"
                                    {...register(`ticketPricing.${index}.price`, { required: "Required" })}
                                />
                            </Form.Group>
                        </Col>

                        {/* Icons */}
                        <Col lg={1} md={1} sm={12} className="d-flex align-items-end gap-2 mb-2">

                            {/* Add */}
                            <Button
                                variant="link"
                                className="p-0"
                                onClick={() => appendPricing({ pickup: "", drop: "", price: "" })}
                            >
                                <i className="bi bi-plus-circle fs-4 text-primary"></i>
                            </Button>

                            {/* Remove */}
                            {pricingFields.length > 1 && (
                                <Button
                                    variant="link"
                                    className="p-0"
                                    onClick={() => removePricing(index)}
                                >
                                    <i className="bi bi-x-circle fs-4 text-danger"></i>
                                </Button>
                            )}
                        </Col>

                    </React.Fragment>
                ))}
            </Row>

            <button className="btn btn-success mt-3 w-100" type="submit">Save Trip</button>

        </Form>
    );
};
