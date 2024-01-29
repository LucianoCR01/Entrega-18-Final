import mongoose from "mongoose";

const UserPasswordModel = mongoose.model("UserPassword", new mongoose.Schema({
    email: String,
    token: String,
    isUsed: { type: Boolean, default: false }
}))

export default UserPasswordModel