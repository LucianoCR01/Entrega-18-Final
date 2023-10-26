import express from "express";
import productModel from "../dao/models/products.model.js";

export const productsMongo = express.Router()

productsMongo.get("/", async (req, res) => {
    const product = await productModel.find().lean()
    return res.status(200).render("mongoDbProducts", { product })
})

productsMongo.get("/:pid", async (req, res) => {
    const ProductId = req.params.pid
    const product = await productModel.find({ _id: ProductId }).lean()
    return res.status(200).render("mongoDbProducts", { product })
})

productsMongo.post("/", async (req, res) => {
    const data = req.body
    const result = await productModel.create(data)
    return res.send({ status: "success", payload: result })
})

productsMongo.put("/:pid", async (req, res) => {
    const ProductId = req.params.pid
    const dataProduct = req.body
    const result = await productModel.updateOne({ _id: ProductId }, dataProduct)
    return res.send({ Status: "success", payload: result })
})

productsMongo.delete("/:pid", async (req, res) => {
    const ProductId = req.params.pid
    const result = await productModel.deleteOne({ _id: ProductId })
    return res.send({ Status: "success", payload: result })
})