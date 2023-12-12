import { productModelsFS } from "../models/product.models.js";

class RealTime {
    constructor() {
        this.realTime = productModelsFS
    }

    getProductsRealTime = () => {
        return this.realTime.getProducts()
    }
}

export default RealTime