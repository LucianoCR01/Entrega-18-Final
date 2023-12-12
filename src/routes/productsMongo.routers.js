import express from "express";
import { uploader } from "../utils.js";
import { createProduct, deleteProduct, findProducts, getProductsMongo, updateProduct } from "../controllers/productsMongo.controllers.js";

export const productsMongo = express.Router()

productsMongo.get("/", getProductsMongo)

productsMongo.get("/:pid", findProducts)

productsMongo.post("/", uploader.single("file"), createProduct)

productsMongo.put("/:id", updateProduct)

productsMongo.delete("/:id", deleteProduct)