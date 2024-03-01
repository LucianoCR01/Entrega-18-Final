import express from "express";
import { actualizarCantidad, agregatedProduct, createCart, deleteProduct, eliminarProdCarrito, findCart, finishBuy, finishMercadoPago, purchase, updateCarrito } from "../controllers/cartsMongo.controllers.js";

export const cartsMongo = express.Router()

cartsMongo.post("/", createCart)

cartsMongo.get("/:cid", findCart)

cartsMongo.post("/:cid/products/:pid", agregatedProduct)

cartsMongo.delete("/:cid/products/:pid", deleteProduct)

cartsMongo.put("/:cid", updateCarrito)

cartsMongo.put("/:cid/products/:pid", actualizarCantidad)

cartsMongo.delete("/:cid", eliminarProdCarrito)

cartsMongo.get("/:cid/purchase", purchase)

cartsMongo.get("/finishBuy/:cid", finishBuy)

cartsMongo.post("/finishBuy", finishMercadoPago)