import mongoose from "mongoose";

const UserModel = mongoose.model("user", new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    isUser: Boolean,
    isAdmin: Boolean,
}))

export default UserModel