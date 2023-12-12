import express from "express";
import { createProdARG, deleteOneAGR, findProductAGR, getProductsAGR, updateOne } from "../controllers/agregarProductos.controllers.js";

export const agregarProductos = express.Router()

agregarProductos.get("/", getProductsAGR)

agregarProductos.get("/:pid", findProductAGR)

agregarProductos.post("/", createProdARG)

agregarProductos.put("/:pid", updateOne)

agregarProductos.delete("/:pid", deleteOneAGR)