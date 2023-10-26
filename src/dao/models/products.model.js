import { Schema, model } from "mongoose";

const productCollection = "products"

const productSchema = new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    code: { type: Number, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, max: 100 },
    picture: { type: String, required: true, max: 100 }
});

const productModel = model(productCollection, productSchema)

export default productModel