import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: { type: String, unique: true },
    purchase_datetime: { type: String },
    amount: { type: Number },
    purchaser: { type: String }
});

const ticketModel = model("tickets", ticketSchema)

export default ticketModel