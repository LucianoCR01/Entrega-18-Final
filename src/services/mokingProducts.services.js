import productsMoking from "../dao/mongo/mokingProducts.models.js"


class createProductsMoking {
    constructor() {
        this.createProductsMoking = new productsMoking()
    }

    getMoking = () => {
        const cantidadProd = 100
        const createProducts = this.createProductsMoking.createProductsMoking(cantidadProd)
        let testPASSED = 0
        console.log("\nPrueba 1. si no devuelve ningun producto")
        if (!createProducts) { console.log("Prueba 1 fallo") }
        else { console.log("Prueba 1: exito"); testPASSED++ }

        console.log("\nPrueba 2. si devuelve menos de 100 productos")
        if (createProducts.length < 100) { console.log("Prueba 2 fallo") }
        else { console.log("Prueba 2: exito"); testPASSED++ }

        console.log(`\nla cantidad de pruebas exitosas son ${testPASSED}`)
        return createProducts
    }
}

export default createProductsMoking