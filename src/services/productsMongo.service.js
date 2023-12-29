import ProductsService from "../dao/mongo/productsMongo.models.js";

class ProductMongoService {
    constructor() {
        this.ProductMongoService = new ProductsService()
    }

    getProducts = (limit, page, sort, filtro) => {
        const options = {
            limit: limit,
            page: page,
            sort: { price: sort }
        }
        let filter = {}

        if (filtro == "si") {
            filter.status = true
        } if (filtro == "no") {
            filter.status = false
        }
        return this.ProductMongoService.getProducts(options, filter)
    }

    findProducts = (idParam) => {
        return this.ProductMongoService.findProducts(idParam)
    }

    createProduct = (title, description, code, price, status, stock, category, picture) => {
        if (!title || !description || !code || !price || !status || !stock || !category || !picture) {
            console.log(
                "validation error: please complete the form."
            );
            return res.status(400).json({
                status: "error",
                msg: "please complete the form.",
                data: {},
            });
        }
        return this.ProductMongoService.createProduct(title, description, code, price, status, stock, category, picture)
    }

    updateProduct = (id, title, description, code, price, status, stock, category, picture) => {
        if (!title || !description || !code || !price || !status || !stock || !category || !picture) {
            console.log(
                "validation error: please complete form."
            );
            return res.status(400).json({
                status: "error",
                msg: "please complete form.",
                data: {},
            });
        }
        return this.ProductMongoService.updateProduct(id, title, description, code, price, status, stock, category, picture)
    }

    deleteProduct = (id) => {
        return this.ProductMongoService.deleteProduct(id)
    }
}

export default ProductMongoService