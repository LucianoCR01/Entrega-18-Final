import mongoose from "mongoose";

const UserModel = mongoose.model("user", new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    isUser: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    premium: { type: Boolean, default: false }
}))

export default UserModel