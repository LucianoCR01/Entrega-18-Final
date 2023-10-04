import express from "express";
import { uploader } from "../utils.js";
import { productos } from "../clases/clases.product.js";

export const productsRouter = express.Router()

productsRouter.get("/", async (req, res) => {
    const limitQuery = req.query.limit
    const arrayProd = await productos.getProducts()
    if (limitQuery) {
        const newArray = arrayProd.slice(0, limitQuery)
        return res.status(200).json({
            status: "success",
            msg: "listado de productos",
            data: newArray
        })

    } else {
        return res.status(200).json({
            status: "success",
            msg: "listado de productos",
            data: arrayProd
        })
    }
})

productsRouter.get("/:pid", async (req, res) => {
    const idParam = req.params.pid
    res.json(await productos.getProductById(idParam))
})

productsRouter.post("/", uploader.single("file"), (req, res) => {
    const newProduct = req.body;
    newProduct.picture = "http://localhost:8080/" + req.file.filename;
    return res.status(200).json({
        status: "success",
        msg: "Producto Creado",
        data: productos.addProduct(newProduct)
    })
})

productsRouter.put("/:pid", async (req, res) => {
    const idActualizar = req.params.pid;
    const updateProduct = req.body;
    const campoActualizar = Object.keys(updateProduct)[0]
    const actualizacion = Object.values(updateProduct)[0]
    res.json(await productos.updateProduct(idActualizar, campoActualizar, actualizacion))
})

productsRouter.delete("/:pid", async (req, res) => {
    const idDelete = req.params.pid;
    res.json(await productos.deleteProduct(idDelete))
})