import AgregarProdModels from "../dao/mongo/agregarProductos.models.js";

class AgregarProdService {
    constructor() {
        this.AgregarProdService = new AgregarProdModels()
    }

    getProductsAGR = () => {
        return this.AgregarProdService.getProductsAGR()
    }

    findProductAGR = (idParam) => {
        return this.AgregarProdService.findProductAGR(idParam)
    }

    createProdARG = (newProduct) => {
        return this.AgregarProdService.createProdARG(newProduct)
    }

    updateOneAGR = (ProductId, dataProduct) => {
        return this.AgregarProdService.updateOneAGR(ProductId, dataProduct)
    }

    deleteOneAGR = (ProductId) => {
        return this.AgregarProdService.deleteOneAGR(ProductId)
    }
}

export default AgregarProdService