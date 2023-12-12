import ProductService from "../services/products.services.js";

const productService = new ProductService()

export const getProducts = async (req, res) => {
    const limitQuery = req.query.limit
    const arrayProd = await productService.getProducts()
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
}

export const getProductByID = async (req, res) => {
    const idParam = req.params.pid
    res.json(await productService.getProductByID(idParam))
}

export const addProduct = (req, res) => {
    const newProduct = req.body;
    newProduct.picture = "http://localhost:8080/" + req.file.filename;
    return res.status(200).json({
        status: "success",
        msg: "Producto Creado",
        data: productService.addProduct(newProduct)
    })
}

export const updateProduct = async (req, res) => {
    const idActualizar = req.params.pid;
    const updateProduct = req.body;
    const campoActualizar = Object.keys(updateProduct)[0]
    const actualizacion = Object.values(updateProduct)[0]
    res.json(await productService.updateProduct(idActualizar, campoActualizar, actualizacion))
}

export const deleteProduct = async (req, res) => {
    const idDelete = req.params.pid;
    res.json(await productService.deleteProduct(idDelete))
}