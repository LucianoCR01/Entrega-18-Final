//@ts-check
import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema({
    productos: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true, ref: "products"
                },
                quantity: { type: Number, default: 1 },
            },
        ],
        default: [],
    },
});
cartSchema.pre('findOne', function () {
    this.populate('productos.product');
});

cartSchema.pre('find', function () {
    this.populate('productos.product');
});

export const CartsModel = model("carts", cartSchema);