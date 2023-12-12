import express from "express";
import { actualizarCantidad, agregatedProduct, createCart, deleteProduct, eliminarProdCarrito, findCart, updateCarrito } from "../controllers/carts.controllers.js";

export const cartsRouter = express.Router()

cartsRouter.post("/", createCart)

cartsRouter.get("/:cid", findCart)

cartsRouter.post("/:cid/products/:pid", agregatedProduct)

cartsRouter.delete("/:cid/products/:pid", deleteProduct)

cartsRouter.put("/:cid", updateCarrito)

cartsRouter.put("/:cid/products/:pid", actualizarCantidad)

cartsRouter.delete("/:cid", eliminarProdCarrito)