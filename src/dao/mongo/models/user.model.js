import mongoose from "mongoose";

const UserModel = mongoose.model("user", new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    isUser: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    premium: { type: Boolean, default: true },
    documents: [
        {
            name: String,
            reference: String
        }
    ],
    last_connection: { type: Date, default: new Date() },
    identificacion: { type: Boolean, default: true },
    domicilio: { type: Boolean, default: true },
    cuenta: { type: Boolean, default: true },
}))

export default UserModel