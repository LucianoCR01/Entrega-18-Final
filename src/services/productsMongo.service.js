import ProductsService from "../models/productsMongo.models.js";

class ProductMongoService {
    constructor() {
        this.ProductMongoService = new ProductsService()
    }

    getProducts = (limit, page, sort, filtro) => {
        return this.ProductMongoService.getProducts(limit, page, sort, filtro)
    }

    findProducts = (idParam) => {
        return this.ProductMongoService.findProducts(idParam)
    }

    createProduct = (title, description, code, price, status, stock, category, picture) => {
        return this.ProductMongoService.createProduct(title, description, code, price, status, stock, category, picture)
    }

    updateProduct = (id, title, description, code, price, status, stock, category, picture) => {
        return this.ProductMongoService.updateProduct(id, title, description, code, price, status, stock, category, picture)
    }

    deleteProduct = (id) => {
        return this.ProductMongoService.deleteProduct(id)
    }
}

export default ProductMongoService