import { productModelsFS } from "../dao/file/product.models.js";

class RealTime {
    constructor() {
        this.realTime = productModelsFS
    }

    getProductsRealTime = () => {
        return this.realTime.getProducts()
    }
}

export default RealTime