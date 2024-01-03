import { generateProducts } from "../../utils.js"

class productsMoking {
    createProductsMoking(cantidadProd) {
        const product = []

        for (let index = 0; index < cantidadProd; index++) {
            product.push(generateProducts())
        }
        return product
    }
}

export default productsMoking