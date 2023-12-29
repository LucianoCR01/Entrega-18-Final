import crypto from "crypto"
import { productModelsFS } from "../dao/file/product.models.js"

class ProductService {
    constructor() {
        this.productModel = productModelsFS
    }

    getProducts = () => {
        return this.productModel.getProducts()
    }

    getProductByID = (id) => {
        const existID = this.productModel.getProductById(id)
        if (existID == undefined) {
            return "not found"
        }
        return existID
    }

    addProduct = (newProduct) => {
        let id = crypto.randomUUID()
        let argumentos = Object.keys(newProduct).length ?? 0
        if (argumentos < 7) {
            return console.log("Faltan argumentos")
        }
        else {
            return this.productModel.addProduct(newProduct, id)
        }
    }

    productService = (idActualizar, campoActualizar, actualizacion) => {
        return this.productModel.updateProduct(idActualizar, campoActualizar, actualizacion)
    }

    deleteProduct = (idDelete) => {
        return this.productModel.deleteProduct(idDelete)
    }
}

export default ProductService