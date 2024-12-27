import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Please enter your full name",
        },
        email: {
            type: String,
            required: "Please enter your email",
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required:false,
        },
        role: {
            type: String,
            default: "user",
        },
        image: {
            type: String,
            default: "https://cdn.create.vista.com/api/media/small/392653328/stock-vector-user-vector-icon-user-editable-stroke-user-linear-symbol-use",
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        defaultPaymentMethod: {
            type: String,
            default: "",
        },
        address: [
            {
                firstName: { type: String },
                phoneNumber: { type: String },
                address1: { type: String },
                city: { type: String },
                zipCode: { type: String },
                state: { type: String },
                country: { type: String },
                payment: { type: String },
                delivery:{type:String},
                // active: {
                //     type: Boolean,
                //     default: false,
                // },
            }
        ]
    },
    { timestamps: true }
);


delete mongoose.connection.models['User'];
const User = mongoose.model('User', userSchema);
export default User;