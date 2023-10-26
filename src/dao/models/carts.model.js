//@ts-check
import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    productos: {
        type: [
            {
                product: { type: String, required: true },
                quantity: { type: Number, default: 1 },
            },
        ],
        default: [],
    },
});

export const CartsModel = model("carts", cartSchema);