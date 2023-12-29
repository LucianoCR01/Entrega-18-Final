import productModel from "./models/products.model.js";

class ProductsService {

    async findProducts(idParam) {
        const findProducts = await productModel.find({ _id: idParam });
        return findProducts
    }

    async getProducts(options, filter) {
        const products = await productModel.paginate(filter, options);
        const { docs, ...rest } = products
        let productos = docs.map(docs => {
            return {
                _id: docs._id,
                title: docs.title,
                description: docs.description,
                code: docs.code,
                price: docs.price,
                status: docs.status,
                stock: docs.stock,
                category: docs.category,
                picture: docs.picture
            }
        })
        return { productos, rest }
    }

    async createProduct(title, description, code, price, status, stock, category, picture) {
        const productCreated = await productModel.create({ title, description, code, price, status, stock, category, picture })
        return productCreated
    }

    async updateProduct(id, title, description, code, price, status, stock, category, picture) {
        const productUptaded = await productModel.updateOne(
            { _id: id },
            { title, description, code, price, status, stock, category, picture }
        );
        return productUptaded
    }

    async deleteProduct(id) {
        const deleted = await productModel.deleteOne({ _id: id });
        return deleted
    }

}

export default ProductsService