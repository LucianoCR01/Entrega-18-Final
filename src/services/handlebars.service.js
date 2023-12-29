import { productModelsFS } from "../dao/file/product.models.js";

class HandlebarServices {
    constructor() {
        this.handlebarServices = productModelsFS
    }

    getProducts = () => {
        return this.handlebarServices.getProducts()
    }
}

export default HandlebarServices