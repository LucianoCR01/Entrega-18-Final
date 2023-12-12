import productModel from "../dao/models/products.model.js"

class AgregarProdModels {

    async getProductsAGR() {
        const product = await productModel.find().lean()
        return product
    }

    async findProductAGR(idParam) {
        const product = await productModel.find({ _id: idParam }).lean()
        return product
    }

    async createProdARG(data) {
        const result = await productModel.create(data)
        return result
    }

    async updateOneAGR(ProductId, dataProduct) {
        const result = await productModel.updateOne({ _id: ProductId }, dataProduct)
        return result
    }

    async deleteOneAGR(ProductId) {
        const result = await productModel.deleteOne({ _id: ProductId })
        return result
    }
}

export default AgregarProdModels