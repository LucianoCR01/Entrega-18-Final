import mongoose from "mongoose";

const UserModel = mongoose.model("user", new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    isUser: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    premium: { type: Boolean, default: false },
    documents: [
        {
            name: String,
            reference: String
        }
    ],
    last_connection: { type: Date, default: new Date() },
    identificacion: { type: Boolean, default: false },
    domicilio: { type: Boolean, default: false },
    cuenta: { type: Boolean, default: false },
}))

export default UserModel