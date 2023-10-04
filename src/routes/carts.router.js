import express from "express";
import { carts } from "../clases/clases.carts.js";

export const cartsRouter = express.Router()

cartsRouter.post("/", (req, res) => {
    return res.status(200).json({
        status: "success",
        msg: "Carrito Agregado",
        data: carts.newCart()
    })
})

cartsRouter.get("/:cid", (req, res) => {
    const idCart = req.params.cid
    return res.status(200).json({
        status: "success",
        msg: "Carrito Buscado",
        data: carts.getCart(idCart)
    })
})

cartsRouter.post("/:cid/product/:pid", (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    return res.status(200).json({
        status: "success",
        msg: "Producto Agregado",
        data: carts.agregarProductos(idCart, idProduct)
    })
})