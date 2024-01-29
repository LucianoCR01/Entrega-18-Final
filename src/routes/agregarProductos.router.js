import express from "express";
import { createProdARG, deleteOneAGR, findProductAGR, getProductsAGR, updateOne } from "../controllers/agregarProductos.controllers.js";

export const agregarProductos = express.Router()

agregarProductos.get("/", auth, getProductsAGR)

agregarProductos.get("/:pid", auth, findProductAGR)

agregarProductos.post("/", auth, createProdARG)

agregarProductos.put("/:pid", auth, updateOne)

agregarProductos.delete("/:pid", auth, deleteOneAGR)

function auth(req, res, next) {
    const user = req.session.user ?? false
    if (user.role == "isAdmin" || "premium") return next()
    res.redirect("/")
}