import express from "express";
import { uploader } from "../utils.js";
import { addProduct, deleteProduct, getProductByID, getProducts, updateProduct } from "../controllers/products.controllers.js";

export const productsRouter = express.Router()

productsRouter.get("/", getProducts)

productsRouter.get("/:pid", getProductByID)

productsRouter.post("/", uploader.single("file"), addProduct)

productsRouter.put("/:pid", updateProduct)

productsRouter.delete("/:pid", deleteProduct)