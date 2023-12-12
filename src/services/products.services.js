import { productModelsFS } from "../models/product.models.js"

class ProductService {
    constructor() {
        this.productModel = productModelsFS
    }

    getProducts = () => {
        return this.productModel.getProducts()
    }

    getProductByID = (id) => {
        return this.productModel.getProductById(id)
    }

    addProduct = (newProduct) => {
        return this.productModel.addProduct(newProduct)
    }

    productService = (idActualizar, campoActualizar, actualizacion) => {
        return this.productModel.updateProduct(idActualizar, campoActualizar, actualizacion)
    }

    deleteProduct = (idDelete) => {
        return this.productModel.deleteProduct(idDelete)
    }
}

export default ProductService