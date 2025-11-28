import mongoose, { Document } from "mongoose";

export interface IStop extends Document {
    name: string;
    time?: string;
}

export interface ITicketPricing {
    pickup: string;
    drop: string;
    price: number;
}

export interface empDetails {
    driver?: mongoose.Schema.Types.ObjectId,
    cleaner?: mongoose.Schema.Types.ObjectId
}

export interface ITrips extends Document {
    user: mongoose.Schema.Types.ObjectId;
    from: string;
    to: string;
    startTime: string;
    endTime: string;
    travelTime: string;
    stops?: IStop[];
    ticketPricing?: ITicketPricing[];
    registrationnum: string;
    color: string;
    seatType: 'Seater' | 'Semi Sleeper' | 'Sleeper';
    totalSeats: string;
    tripDate: Date,
    emp: empDetails,
    isAssigned: boolean
}

const tripsSchema = new mongoose.Schema<ITrips>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Profile",
        },

        from: {
            type: String,
            required: true,
        },

        to: {
            type: String,
            required: true,
        },

        startTime: {
            type: String,
            required: true,
        },

        endTime: {
            type: String,
            required: true,
        },

        travelTime: {
            type: String,
            required: true,
        },

        stops: [
            {
                name: { type: String, required: true },
                time: { type: String, required: true },
            },
        ],

        ticketPricing: [
            {
                pickup: { type: String, required: true },
                drop: { type: String, required: true },
                price: { type: Number, required: true },
            },
        ],

        registrationnum: {
            type: String,
            required: true,
        },

        color: {
            type: String,
            required: true,
        },

        seatType: {
            type: String,
            enum: ['Seater', 'Semi Sleeper', 'Sleeper'],
            required: true,
        },

        totalSeats: {
            type: String,
            required: true,
        },

        tripDate: {
            type: Date,
            required: true
        },

        emp: {
            driver: {
                type: mongoose.Schema.ObjectId
            },
            cleaner: {
                type: mongoose.Schema.ObjectId
            }
        },

        isAssigned: {
            type: Boolean
        }
    },
    { timestamps: true }
);

export default mongoose.model<ITrips>("Trips", tripsSchema);
